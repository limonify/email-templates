import * as React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { getBlockDefinition } from "@limonify/email-templates/web";
import { cn } from "@/lib/cn";
import { duplicateBlock, removeBlock, useEditor } from "@/editor/store";

export interface BlockRect {
  id: string;
  type: string;
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * The canvas iframe holds the real email; this layer sits on top of it in the
 * host document and draws everything the email itself must not contain:
 * hover and selection outlines, the block toolbar, and the drop zones.
 *
 * Keeping the drop zones out here is what makes dragging across the iframe
 * boundary work at all - dnd-kit only ever sees coordinates from one document.
 */
export function CanvasOverlay({
  rects,
  emptyRect,
  isDragging,
}: {
  rects: BlockRect[];
  emptyRect: {
    top: number;
    left: number;
    width: number;
    height: number;
  } | null;
  isDragging: boolean;
}) {
  const selectedId = useEditor((state) => state.selectedId);
  const hoveredId = useEditor((state) => state.hoveredId);

  const selected = rects.find((rect) => rect.id === selectedId);
  const hovered =
    hoveredId && hoveredId !== selectedId
      ? rects.find((rect) => rect.id === hoveredId)
      : undefined;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {rects.length === 0 && emptyRect ? (
        <DropZone index={0} rect={emptyRect} isDragging={isDragging} empty />
      ) : null}

      {/* Each block contributes two zones: drop above it, or below it. */}
      {rects.map((rect, index) => (
        <React.Fragment key={rect.id}>
          <DropZone
            index={index}
            edge="top"
            rect={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height / 2,
            }}
            isDragging={isDragging}
          />
          <DropZone
            index={index + 1}
            edge="bottom"
            rect={{
              top: rect.top + rect.height / 2,
              left: rect.left,
              width: rect.width,
              height: rect.height / 2,
            }}
            isDragging={isDragging}
          />
        </React.Fragment>
      ))}

      {hovered ? (
        <div
          className="absolute rounded-[3px] ring-1 ring-accent/40"
          style={frame(hovered)}
        />
      ) : null}

      {selected ? <SelectionFrame rect={selected} /> : null}
    </div>
  );
}

function frame(rect: {
  top: number;
  left: number;
  width: number;
  height: number;
}): React.CSSProperties {
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

function SelectionFrame({ rect }: { rect: BlockRect }) {
  const label = safeLabel(rect.type);
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `block:${rect.id}`,
    data: { kind: "block", blockId: rect.id },
  });

  return (
    <div
      className={cn(
        "absolute rounded-[3px] ring-2 ring-accent",
        isDragging && "opacity-40",
      )}
      style={frame(rect)}
    >
      <div className="pointer-events-auto absolute -top-6 left-0 flex items-center gap-0.5 rounded-md bg-accent px-1 py-0.5 text-[10px] font-semibold text-white shadow-lg">
        <button
          ref={setNodeRef}
          type="button"
          title="Drag to move"
          className="cursor-grab px-1 active:cursor-grabbing"
          {...listeners}
          {...attributes}
        >
          ⠿
        </button>
        <span className="px-1">{label}</span>
        <button
          type="button"
          title="Duplicate"
          className="cursor-pointer rounded px-1 hover:bg-white/20"
          onClick={() => duplicateBlock(rect.id)}
        >
          ⧉
        </button>
        <button
          type="button"
          title="Delete"
          className="cursor-pointer rounded px-1 hover:bg-white/20"
          onClick={() => removeBlock(rect.id)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function DropZone({
  index,
  rect,
  isDragging,
  edge = "top",
  empty = false,
}: {
  index: number;
  rect: { top: number; left: number; width: number; height: number };
  isDragging: boolean;
  /** Which side of this half-block zone the insertion line sits on. */
  edge?: "top" | "bottom";
  empty?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot:${index}`,
    data: { index },
  });

  return (
    <div ref={setNodeRef} className="absolute" style={frame(rect)}>
      {isDragging && isOver ? (
        empty ? (
          <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-accent bg-accent/10 text-[11px] font-semibold text-accent">
            Drop block here
          </div>
        ) : (
          <div
            className={cn(
              "absolute right-0 left-0 h-0.5 rounded-full bg-accent shadow-[0_0_8px] shadow-accent",
              edge === "top" ? "top-0" : "top-full",
            )}
          />
        )
      ) : null}
    </div>
  );
}

function safeLabel(type: string): string {
  try {
    return getBlockDefinition(type as never).label;
  } catch {
    return type;
  }
}
