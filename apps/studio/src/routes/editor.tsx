import * as React from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  DOCUMENT_PRESETS,
  createEmptyDocument,
  getBlockDefinition,
  parseDocument,
  renderDocumentToHtml,
  type BlockType,
} from "@limonify/email-templates/web";
import { Button, ToggleGroup } from "@/components/ui";
import { cn } from "@/lib/cn";
import { EmailCanvas } from "@/editor/Canvas";
import { Inspector } from "@/editor/Inspector";
import { Palette } from "@/editor/Palette";
import {
  deleteDocument,
  lastOpenedDocument,
  listDocuments,
  loadDocument,
  type DocumentSummary,
} from "@/editor/documents";
import {
  duplicateBlock,
  editorStore,
  insertBlock,
  moveBlock,
  openDocument,
  redo,
  removeBlock,
  selectBlock,
  setExactHtml,
  setViewport,
  undo,
  useEditor,
} from "@/editor/store";
import {
  copyToClipboard,
  downloadFile,
  pickFile,
  slugify,
  type Viewport,
} from "@/lib/render";

export function EditorRoute() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/editor" });
  const [dragLabel, setDragLabel] = React.useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = React.useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  // Resolve which document to open: an explicit preset or id from the URL,
  // otherwise whatever was open last, otherwise a fresh blank template. The ref
  // keeps a remount (or StrictMode's double effect) from creating a second
  // blank document.
  const resolved = React.useRef<string | null>(null);
  React.useEffect(() => {
    const key = search.preset
      ? `preset:${search.preset}`
      : search.doc
        ? `doc:${search.doc}`
        : "last";
    if (resolved.current === key) return;
    resolved.current = key;

    if (search.preset) {
      const preset = DOCUMENT_PRESETS.find((item) => item.id === search.preset);
      if (preset) openDocument(preset.build());
      navigate({ to: "/editor", search: {}, replace: true });
      return;
    }
    if (search.doc) {
      const stored = loadDocument(search.doc);
      if (stored) openDocument(stored);
      navigate({ to: "/editor", search: {}, replace: true });
      return;
    }
    const last = lastOpenedDocument();
    openDocument(last ?? createEmptyDocument("Untitled template"));
    if (!last) setPickerOpen(true);
  }, [search.preset, search.doc, navigate]);

  useKeyboardShortcuts();

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current;
    if (data?.kind === "palette") {
      setDragLabel(getBlockDefinition(data.blockType as BlockType).label);
    } else if (data?.kind === "block") {
      const block = editorStore.state.doc.blocks.find(
        (item) => item.id === data.blockId,
      );
      setDragLabel(block ? getBlockDefinition(block.type).label : "Block");
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setDragLabel(null);
    const index = event.over?.data.current?.index as number | undefined;
    if (index === undefined) return;

    const data = event.active.data.current;
    if (data?.kind === "palette") {
      insertBlock(data.blockType as BlockType, index);
    } else if (data?.kind === "block") {
      moveBlock(data.blockId as string, index);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setDragLabel(null)}
    >
      <div className="flex h-full">
        <Palette />

        <section className="flex min-w-0 flex-1 flex-col">
          <Toolbar onOpenPicker={() => setPickerOpen(true)} />
          <div
            className="min-h-0 flex-1 overflow-auto p-6"
            onMouseDown={(event) => {
              // Clicking the empty canvas background clears the selection.
              if (event.target === event.currentTarget) selectBlock(null);
            }}
          >
            <EmailCanvas isDragging={dragLabel !== null} />
          </div>
        </section>

        <Inspector />
      </div>

      <DragOverlay dropAnimation={null}>
        {dragLabel ? (
          <div className="rounded-md bg-accent px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lg">
            {dragLabel}
          </div>
        ) : null}
      </DragOverlay>

      {pickerOpen ? (
        <DocumentPicker onClose={() => setPickerOpen(false)} />
      ) : null}
    </DndContext>
  );
}

function Toolbar({ onOpenPicker }: { onOpenPicker: () => void }) {
  const doc = useEditor((state) => state.doc);
  const engine = useEditor((state) => state.engine);
  const viewport = useEditor((state) => state.viewport);
  const exactHtml = useEditor((state) => state.exactHtml);
  const canUndo = useEditor((state) => state.past.length > 0);
  const canRedo = useEditor((state) => state.future.length > 0);
  const [copied, setCopied] = React.useState(false);

  async function exportHtml(download: boolean) {
    const html = await renderDocumentToHtml(doc, { engine });
    if (download) {
      downloadFile(`${slugify(doc.name)}.html`, html);
      return;
    }
    await copyToClipboard(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function exportJson() {
    downloadFile(
      `${slugify(doc.name)}.json`,
      JSON.stringify(doc, null, 2),
      "application/json",
    );
  }

  async function importJson() {
    const file = await pickFile("application/json,.json");
    if (!file) return;
    try {
      openDocument(parseDocument(JSON.parse(await file.text())));
    } catch (err) {
      alert(`Could not import document: ${(err as Error).message}`);
    }
  }

  return (
    <header className="flex h-14 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-chrome-700 bg-chrome-900 px-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onOpenPicker}>
          Templates
        </Button>
        <span className="max-w-[220px] truncate text-sm font-semibold tracking-tight">
          {doc.name}
        </span>
        <span className="text-[10px] text-chrome-400">
          {doc.blocks.length} blocks
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-0.5">
          <Button onClick={undo} disabled={!canUndo} title="Undo (⌘Z)">
            ↶
          </Button>
          <Button onClick={redo} disabled={!canRedo} title="Redo (⇧⌘Z)">
            ↷
          </Button>
        </div>

        <ToggleGroup<Viewport>
          value={viewport}
          onChange={setViewport}
          options={[
            { value: "desktop", label: "Desktop" },
            { value: "mobile", label: "Mobile" },
          ]}
        />

        <ToggleGroup<"live" | "html">
          value={exactHtml ? "html" : "live"}
          onChange={(value) => setExactHtml(value === "html")}
          options={[
            { value: "live", label: "Edit", title: "Editable canvas" },
            {
              value: "html",
              label: "Exact HTML",
              title: "Render the exported HTML",
            },
          ]}
        />

        <Button variant="ghost" onClick={importJson}>
          Import
        </Button>
        <Button variant="ghost" onClick={exportJson}>
          JSON
        </Button>
        <Button variant="ghost" onClick={() => exportHtml(true)}>
          HTML
        </Button>
        <Button variant="primary" onClick={() => exportHtml(false)}>
          {copied ? "Copied" : "Copy HTML"}
        </Button>
      </div>
    </header>
  );
}

function DocumentPicker({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = React.useState<DocumentSummary[]>(() =>
    listDocuments(),
  );
  const currentId = useEditor((state) => state.doc.id);

  function open(id: string) {
    const doc = loadDocument(id);
    if (doc) openDocument(doc);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-chrome-700 bg-chrome-900 p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Start a template</h2>
          <Button onClick={onClose}>Close</Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {DOCUMENT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                openDocument(preset.build());
                onClose();
              }}
              className="cursor-pointer rounded-lg border border-chrome-700 bg-chrome-850 p-3 text-left transition-colors hover:border-chrome-400"
            >
              <span className="block text-xs font-semibold">
                {preset.label}
              </span>
              <span className="mt-1 block text-[11px] leading-4 text-chrome-400">
                {preset.description}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-5 mb-2 text-[10px] font-semibold tracking-[0.08em] text-chrome-400 uppercase">
          Saved in this browser ({saved.length})
        </div>
        {saved.length === 0 ? (
          <p className="text-[11px] text-chrome-400">
            Nothing saved yet - every edit autosaves to this browser.
          </p>
        ) : (
          <ul className="space-y-1">
            {saved.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "flex items-center justify-between rounded-lg border border-chrome-700 bg-chrome-850 px-3 py-2",
                  item.id === currentId && "border-accent/60",
                )}
              >
                <button
                  type="button"
                  onClick={() => open(item.id)}
                  className="min-w-0 flex-1 cursor-pointer text-left"
                >
                  <span className="block truncate text-xs font-semibold">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-chrome-400">
                    {item.blocks} blocks
                    {item.updatedAt
                      ? ` · ${new Date(item.updatedAt).toLocaleString()}`
                      : ""}
                  </span>
                </button>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteDocument(item.id);
                    setSaved(listDocuments());
                  }}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function useKeyboardShortcuts() {
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      // Never hijack typing in the inspector.
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      const meta = event.metaKey || event.ctrlKey;
      const selectedId = editorStore.state.selectedId;

      if (meta && event.key.toLowerCase() === "z") {
        event.preventDefault();
        event.shiftKey ? redo() : undo();
        return;
      }
      if (meta && event.key.toLowerCase() === "d" && selectedId) {
        event.preventDefault();
        duplicateBlock(selectedId);
        return;
      }
      if ((event.key === "Backspace" || event.key === "Delete") && selectedId) {
        event.preventDefault();
        removeBlock(selectedId);
        return;
      }
      if (event.key === "Escape") {
        selectBlock(null);
        return;
      }
      if (
        event.altKey &&
        selectedId &&
        ["ArrowUp", "ArrowDown"].includes(event.key)
      ) {
        event.preventDefault();
        const blocks = editorStore.state.doc.blocks;
        const index = blocks.findIndex((block) => block.id === selectedId);
        if (index === -1) return;
        moveBlock(selectedId, event.key === "ArrowUp" ? index - 1 : index + 2);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
