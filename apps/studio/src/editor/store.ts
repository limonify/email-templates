import { Store, useStore } from "@tanstack/react-store";
import {
  createBlock,
  createBlockId,
  createEmptyDocument,
  type BlockType,
  type BrandingConfig,
  type EmailDocument,
  type EmailTheme,
  type TemplateEngine,
} from "@limonify/email-templates/web";
import { saveDocument } from "@/editor/documents";
import type { Viewport } from "@/lib/render";

interface EditorState {
  doc: EmailDocument;
  selectedId: string | null;
  hoveredId: string | null;
  past: EmailDocument[];
  future: EmailDocument[];
  engine: TemplateEngine;
  viewport: Viewport;
  /** Renders the exported HTML instead of the live React tree. */
  exactHtml: boolean;
}

const HISTORY_LIMIT = 50;

export const editorStore = new Store<EditorState>({
  doc: createEmptyDocument(),
  selectedId: null,
  hoveredId: null,
  past: [],
  future: [],
  engine: "go",
  viewport: "desktop",
  exactHtml: false,
});

export function useEditor<T>(selector: (state: EditorState) => T): T {
  return useStore(editorStore, selector);
}

export function openDocument(doc: EmailDocument) {
  editorStore.setState((state) => ({
    ...state,
    doc,
    selectedId: null,
    hoveredId: null,
    past: [],
    future: [],
  }));
  saveDocument(doc);
}

/**
 * Single entry point for every document mutation: it stamps `updatedAt`,
 * pushes the previous revision onto the undo stack and persists. Undo/redo and
 * autosave therefore need no per-action bookkeeping.
 */
function commit(mutate: (draft: EmailDocument) => void) {
  editorStore.setState((state) => {
    const next = structuredClone(state.doc);
    mutate(next);
    next.updatedAt = new Date().toISOString();
    saveDocument(next);
    return {
      ...state,
      doc: next,
      past: [...state.past, state.doc].slice(-HISTORY_LIMIT),
      future: [],
    };
  });
}

export function undo() {
  editorStore.setState((state) => {
    const previous = state.past.at(-1);
    if (!previous) return state;
    saveDocument(previous);
    return {
      ...state,
      doc: previous,
      past: state.past.slice(0, -1),
      future: [state.doc, ...state.future].slice(0, HISTORY_LIMIT),
    };
  });
}

export function redo() {
  editorStore.setState((state) => {
    const next = state.future[0];
    if (!next) return state;
    saveDocument(next);
    return {
      ...state,
      doc: next,
      past: [...state.past, state.doc].slice(-HISTORY_LIMIT),
      future: state.future.slice(1),
    };
  });
}

export function selectBlock(id: string | null) {
  editorStore.setState((state) => ({ ...state, selectedId: id }));
}

export function hoverBlock(id: string | null) {
  editorStore.setState((state) =>
    state.hoveredId === id ? state : { ...state, hoveredId: id },
  );
}

export function setEngine(engine: TemplateEngine) {
  editorStore.setState((state) => ({ ...state, engine }));
}

export function setViewport(viewport: Viewport) {
  editorStore.setState((state) => ({ ...state, viewport }));
}

export function setExactHtml(exactHtml: boolean) {
  editorStore.setState((state) => ({ ...state, exactHtml }));
}

export function insertBlock(type: BlockType, index: number) {
  const block = createBlock(type);
  commit((doc) => {
    doc.blocks.splice(clamp(index, 0, doc.blocks.length), 0, block);
  });
  selectBlock(block.id);
}

export function moveBlock(id: string, index: number) {
  commit((doc) => {
    const from = doc.blocks.findIndex((block) => block.id === id);
    if (from === -1) return;
    const [block] = doc.blocks.splice(from, 1);
    if (!block) return;
    // The target index was measured before removal, so anything after the
    // original position shifts up by one.
    const to = clamp(index > from ? index - 1 : index, 0, doc.blocks.length);
    doc.blocks.splice(to, 0, block);
  });
}

export function removeBlock(id: string) {
  commit((doc) => {
    doc.blocks = doc.blocks.filter((block) => block.id !== id);
  });
  editorStore.setState((state) => ({
    ...state,
    selectedId: state.selectedId === id ? null : state.selectedId,
  }));
}

export function duplicateBlock(id: string) {
  let newId: string | null = null;
  commit((doc) => {
    const index = doc.blocks.findIndex((block) => block.id === id);
    const block = doc.blocks[index];
    if (!block) return;
    newId = createBlockId(block.type);
    doc.blocks.splice(index + 1, 0, {
      ...structuredClone(block),
      id: newId,
    });
  });
  if (newId) selectBlock(newId);
}

export function updateBlockProps(id: string, patch: Record<string, unknown>) {
  commit((doc) => {
    const block = doc.blocks.find((item) => item.id === id);
    if (block) block.props = { ...block.props, ...patch };
  });
}

export function updateTheme(patch: Partial<EmailTheme>) {
  commit((doc) => {
    doc.theme = { ...doc.theme, ...patch };
  });
}

export function replaceTheme(theme: Partial<EmailTheme>) {
  commit((doc) => {
    doc.theme = theme;
  });
}

export function updateBranding(patch: Partial<BrandingConfig>) {
  commit((doc) => {
    doc.branding = { ...doc.branding, ...patch };
  });
}

export function updateMeta(patch: Partial<EmailDocument["meta"]>) {
  commit((doc) => {
    doc.meta = { ...doc.meta, ...patch };
  });
}

export function setMode(mode: "dark" | "light") {
  commit((doc) => {
    doc.mode = mode;
  });
}

export function renameDocument(name: string) {
  commit((doc) => {
    doc.name = name;
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
