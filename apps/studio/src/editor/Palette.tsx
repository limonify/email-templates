import { useDraggable } from "@dnd-kit/core";
import {
  BLOCK_LIST,
  type BlockDefinition,
  type BlockGroup,
} from "@limonify/email-templates/web";
import { cn } from "@/lib/cn";
import { insertBlock, useEditor } from "@/editor/store";

const GROUPS: Array<{ id: BlockGroup; label: string }> = [
  { id: "content", label: "Content" },
  { id: "action", label: "Actions" },
  { id: "data", label: "Data" },
  { id: "layout", label: "Layout" },
];

export function Palette() {
  return (
    <aside className="flex w-[230px] shrink-0 flex-col border-r border-chrome-700 bg-chrome-900">
      <div className="border-b border-chrome-700 px-4 py-3">
        <div className="text-xs font-semibold">Blocks</div>
        <div className="mt-0.5 text-[10px] text-chrome-400">
          Drag onto the email, or click to append
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {GROUPS.map((group) => {
          const items = BLOCK_LIST.filter((block) => block.group === group.id);
          if (!items.length) return null;
          return (
            <div key={group.id} className="mb-2">
              <div className="px-2 pt-2 pb-1 text-[10px] font-semibold tracking-[0.08em] text-chrome-400 uppercase">
                {group.label}
              </div>
              {items.map((block) => (
                <PaletteItem key={block.type} block={block} />
              ))}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function PaletteItem({ block }: { block: BlockDefinition }) {
  const blockCount = useEditor((state) => state.doc.blocks.length);
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette:${block.type}`,
    data: { kind: "palette", blockType: block.type },
  });

  return (
    <button
      ref={setNodeRef}
      type="button"
      // Clicking appends to the end - the keyboard-friendly path to the same
      // result as dragging.
      onClick={() => insertBlock(block.type, blockCount)}
      className={cn(
        "mb-1 block w-full cursor-grab rounded-lg border border-transparent px-2.5 py-2 text-left transition-colors hover:bg-chrome-800 active:cursor-grabbing",
        isDragging && "opacity-40",
      )}
      {...listeners}
      {...attributes}
    >
      <span className="block text-xs font-semibold text-chrome-50">
        {block.label}
      </span>
      <span className="mt-0.5 block text-[10px] leading-4 text-chrome-400">
        {block.description}
      </span>
    </button>
  );
}
