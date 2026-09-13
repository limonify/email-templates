import { describe, it, expect } from "bun:test";
import {
  BLOCK_LIST,
  BLOCK_REGISTRY,
  createBlock,
} from "../src/document/blocks.js";
import type { BlockType } from "../src/document/types.js";
import {
  DOCUMENT_PRESETS,
  createEmptyDocument,
  parseDocument,
} from "../src/document/presets.js";
import { renderDocumentToHtml } from "../src/document/render.js";

describe("editor document model", () => {
  const blockTypes = Object.keys(BLOCK_REGISTRY) as BlockType[];

  it("renders every block type with its default props", async () => {
    const doc = createEmptyDocument("All blocks");
    doc.blocks = blockTypes.map((type) => createBlock(type));

    const html = await renderDocumentToHtml(doc);
    expect(html).toContain("<!DOCTYPE html");
    for (const block of doc.blocks) {
      expect(html).toContain(`data-block-id="${block.id}"`);
    }
  });

  it("exposes a field schema for every editable block", () => {
    for (const def of BLOCK_LIST) {
      expect(def.label.length).toBeGreaterThan(0);
      for (const field of def.fields) {
        expect(field.key.length).toBeGreaterThan(0);
        if (field.type === "select") expect(field.options?.length).toBeTruthy();
        if (field.type === "list")
          expect(field.itemFields?.length).toBeTruthy();
      }
    }
  });

  it("renders every preset in both modes", async () => {
    for (const preset of DOCUMENT_PRESETS) {
      for (const mode of ["dark", "light"] as const) {
        const doc = { ...preset.build(), mode };
        const html = await renderDocumentToHtml(doc);
        expect(html.length).toBeGreaterThan(100);
      }
    }
  });

  it("converts backend placeholders per engine", async () => {
    const doc = createEmptyDocument("Engines");
    doc.blocks = [createBlock("heading", { text: "Hi {{ .UserName }}" })];

    expect(await renderDocumentToHtml(doc, { engine: "go" })).toContain(
      "{{ .UserName }}",
    );
    expect(await renderDocumentToHtml(doc, { engine: "handlebars" })).toContain(
      "{{ userName }}",
    );
    expect(await renderDocumentToHtml(doc, { engine: "raw" })).toContain(
      "__USER_NAME__",
    );
  });

  it("drops unknown block types on import instead of throwing", () => {
    const imported = parseDocument({
      version: 1,
      name: "From a newer editor",
      blocks: [
        { id: "a", type: "heading", props: { text: "Kept" } },
        { id: "b", type: "carousel-3d", props: {} },
      ],
    });

    expect(imported.blocks).toHaveLength(1);
    expect(imported.blocks[0]!.type).toBe("heading");
    expect(imported.branding.appName).toBe("Limonify");
  });

  it("rejects input that is not a document", () => {
    expect(() => parseDocument(null)).toThrow();
    expect(() => parseDocument({ version: 1 })).toThrow();
  });
});
