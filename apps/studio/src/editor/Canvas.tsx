import * as React from "react";
import { createPortal } from "react-dom";
import {
  DocumentEmail,
  renderDocumentToHtml,
  type EmailDocument,
} from "@limonify/email-templates/web";
import { CanvasOverlay, type BlockRect } from "@/editor/Overlay";
import { hoverBlock, selectBlock, useEditor } from "@/editor/store";
import { VIEWPORT_WIDTH } from "@/lib/render";

/**
 * The iframe starts from a fixed shell so the email gets its own document -
 * same isolation a real mail client gives it - while staying same-origin, which
 * is what lets the overlay measure blocks and forward clicks.
 *
 * `DocumentEmail` renders `<Html>/<Head>/<Body>`; React applies those to the
 * iframe's real document elements rather than nesting new ones, so the canvas
 * picks up the email's own background and font. The reset below only covers
 * the moment before that happens.
 */
const SHELL = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
<style>
  html, body { margin: 0; padding: 0; background: transparent; }
  body > html, body html, body body { display: block; margin: 0; padding: 0; }
  [data-block-id] { cursor: default; }
</style>
</head>
<body></body>
</html>`;

export function EmailCanvas({ isDragging }: { isDragging: boolean }) {
  const doc = useEditor((state) => state.doc);
  const viewport = useEditor((state) => state.viewport);
  const exactHtml = useEditor((state) => state.exactHtml);

  const width = VIEWPORT_WIDTH[viewport];

  if (exactHtml) {
    return <ExactHtmlCanvas width={width} />;
  }

  return <LiveCanvas width={width} doc={doc} isDragging={isDragging} />;
}

function LiveCanvas({
  width,
  doc,
  isDragging,
}: {
  width: number;
  doc: EmailDocument;
  isDragging: boolean;
}) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<HTMLIFrameElement>(null);
  const [frameDoc, setFrameDoc] = React.useState<Document | null>(null);
  const [height, setHeight] = React.useState(720);
  const [rects, setRects] = React.useState<BlockRect[]>([]);
  const [emptyRect, setEmptyRect] = React.useState<BlockRect | null>(null);

  const measure = React.useCallback(() => {
    const frame = frameRef.current;
    const wrapper = wrapperRef.current;
    if (!frameDoc || !frame || !wrapper || !frameDoc.body) return;

    const contentHeight = Math.max(
      frameDoc.body.scrollHeight,
      frameDoc.documentElement.scrollHeight,
    );
    setHeight((current) =>
      Math.abs(current - contentHeight) > 1 ? contentHeight : current,
    );

    const frameRect = frame.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const dx = frameRect.left - wrapperRect.left;
    const dy = frameRect.top - wrapperRect.top;

    const next: BlockRect[] = [];
    frameDoc.querySelectorAll("[data-block-id]").forEach((node) => {
      const element = node as HTMLElement;
      const rect = element.getBoundingClientRect();
      next.push({
        id: element.dataset.blockId!,
        type: element.dataset.blockType ?? "",
        top: rect.top + dy,
        left: rect.left + dx,
        width: rect.width,
        height: rect.height,
      });
    });
    setRects(next);

    // With no blocks yet the drop target is the card itself, so an empty
    // template still has somewhere obvious to drop the first block.
    const card =
      frameDoc.querySelector<HTMLElement>(".lm-card") ??
      frameDoc.querySelector<HTMLElement>(".lm-container");
    if (card) {
      const rect = card.getBoundingClientRect();
      setEmptyRect({
        id: "empty",
        type: "",
        top: rect.top + dy,
        left: rect.left + dx,
        width: rect.width,
        height: Math.max(rect.height, 120),
      });
    }
  }, [frameDoc]);

  // Re-measure whenever the document changes, after the browser has laid the
  // new tree out (and again once webfonts land, which shifts every rect).
  React.useEffect(() => {
    if (!frameDoc) return;
    const raf = requestAnimationFrame(measure);
    frameDoc.fonts?.ready.then(measure).catch(() => {});
    return () => cancelAnimationFrame(raf);
  }, [frameDoc, measure, doc]);

  React.useEffect(() => {
    if (!frameDoc?.body) return;
    const observer = new ResizeObserver(measure);
    observer.observe(frameDoc.body);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [frameDoc, measure]);

  // Selection and hover come from real clicks on the rendered email.
  React.useEffect(() => {
    if (!frameDoc) return;

    const onClick = (event: MouseEvent) => {
      // A button or link inside the canvas would navigate the iframe away from
      // the email being edited; clicking it means "select this block".
      event.preventDefault();
      const target = event.target as HTMLElement | null;
      selectBlock(
        target?.closest<HTMLElement>("[data-block-id]")?.dataset.blockId ??
          null,
      );
    };
    const onMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      hoverBlock(
        target?.closest<HTMLElement>("[data-block-id]")?.dataset.blockId ??
          null,
      );
    };
    const onLeave = () => hoverBlock(null);

    frameDoc.addEventListener("click", onClick);
    frameDoc.addEventListener("mousemove", onMove);
    frameDoc.addEventListener("mouseleave", onLeave);
    return () => {
      frameDoc.removeEventListener("click", onClick);
      frameDoc.removeEventListener("mousemove", onMove);
      frameDoc.removeEventListener("mouseleave", onLeave);
    };
  }, [frameDoc]);

  return (
    <div ref={wrapperRef} className="relative mx-auto" style={{ width }}>
      <iframe
        ref={frameRef}
        title="Email canvas"
        srcDoc={SHELL}
        onLoad={(event) => setFrameDoc(event.currentTarget.contentDocument)}
        className="block w-full rounded-xl border border-chrome-700 bg-black shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)]"
        style={{ height }}
      />
      {frameDoc?.body
        ? createPortal(<DocumentEmail doc={doc} />, frameDoc.body)
        : null}
      <CanvasOverlay
        rects={rects}
        emptyRect={emptyRect}
        isDragging={isDragging}
      />
    </div>
  );
}

/** Renders the exported HTML verbatim - the parity check for the live canvas. */
function ExactHtmlCanvas({ width }: { width: number }) {
  const doc = useEditor((state) => state.doc);
  const engine = useEditor((state) => state.engine);
  const [html, setHtml] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;
    renderDocumentToHtml(doc, { engine }).then((result) => {
      if (!cancelled) setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [doc, engine]);

  return (
    <iframe
      title="Exported HTML"
      srcDoc={html}
      className="mx-auto block h-full rounded-xl border border-chrome-700 bg-black shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)]"
      style={{ width }}
    />
  );
}
