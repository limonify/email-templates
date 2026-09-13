import * as React from "react";
import { render } from "@react-email/render";
import { EmailLayout } from "../components/email-layout.js";
import {
  defaultLimonifyDarkTheme,
  defaultLimonifyLightTheme,
} from "../theme/defaults.js";
import { adaptVariables } from "../generator/adapters.js";
import type { EmailTheme, TemplateEngine } from "../theme/types.js";
import { renderBlock } from "./blocks.js";
import type { EmailDocument } from "./types.js";

export function resolveDocumentTheme(doc: EmailDocument): EmailTheme {
  const base =
    doc.mode === "light" ? defaultLimonifyLightTheme : defaultLimonifyDarkTheme;
  return { ...base, ...doc.theme };
}

export interface DocumentEmailProps {
  doc: EmailDocument;
  /** Overrides the document's own theme - used by the editor's mode toggle. */
  theme?: EmailTheme;
}

/**
 * Renders a document with the same layout shell as the built-in templates, so
 * branding, card style and footer behave identically.
 *
 * Each block keeps a `data-block-id` wrapper: the studio canvas mounts this
 * very component inside an iframe and measures those nodes to place selection
 * outlines and drop indicators. The attributes are inert in email clients, and
 * keeping them in the exported HTML too is what guarantees the canvas and the
 * export cannot drift apart.
 */
export const DocumentEmail: React.FC<DocumentEmailProps> = ({ doc, theme }) => {
  const resolvedTheme = theme || resolveDocumentTheme(doc);

  return (
    <EmailLayout
      theme={resolvedTheme}
      previewText={doc.meta?.previewText}
      cardStyle={resolvedTheme.cardStyle}
      {...doc.branding}
    >
      {doc.blocks.map((block) => (
        <div
          key={block.id}
          data-block-id={block.id}
          data-block-type={block.type}
        >
          {renderBlock(block, { theme: resolvedTheme })}
        </div>
      ))}
    </EmailLayout>
  );
};

export interface RenderDocumentOptions {
  engine?: TemplateEngine;
  theme?: EmailTheme;
  pretty?: boolean;
}

export async function renderDocumentToHtml(
  doc: EmailDocument,
  options: RenderDocumentOptions = {},
): Promise<string> {
  const { engine = "go", theme, pretty = true } = options;
  const html = await render(<DocumentEmail doc={doc} theme={theme} />, {
    pretty,
  });
  return adaptVariables(html, engine);
}

export async function renderDocumentToPlainText(
  doc: EmailDocument,
  options: Pick<RenderDocumentOptions, "theme"> = {},
): Promise<string> {
  return render(<DocumentEmail doc={doc} theme={options.theme} />, {
    plainText: true,
  });
}
