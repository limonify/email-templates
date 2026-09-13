import type * as React from "react";
import type { BrandingConfig, EmailTheme } from "../theme/types.js";

/**
 * An email authored in the studio editor.
 *
 * The document is the serializable source of truth: the editor stores it, the
 * canvas renders it live, and `renderDocumentToHtml` turns it into the same
 * HTML the CLI writes out. Any text field may contain backend placeholders
 * (`{{ .UserName }}`); they survive rendering and are converted per engine by
 * `adaptVariables`.
 */
export interface EmailDocument {
  version: 1;
  id: string;
  name: string;
  meta: {
    subject?: string;
    previewText?: string;
  };
  mode: "light" | "dark";
  /** Overrides layered on top of the mode's default palette. */
  theme: Partial<EmailTheme>;
  branding: BrandingConfig;
  blocks: EmailBlock[];
  createdAt?: string;
  updatedAt?: string;
}

export interface EmailBlock {
  id: string;
  type: BlockType;
  props: Record<string, any>;
}

export type BlockType =
  | "heading"
  | "text"
  | "button"
  | "button-group"
  | "badge"
  | "divider"
  | "spacer"
  | "image"
  | "image-text"
  | "gallery"
  | "columns"
  | "bullet-list"
  | "quote"
  | "social-links"
  | "otp"
  | "code-box"
  | "info-card"
  | "steps"
  | "device-session"
  | "key-values"
  | "progress"
  | "link-list"
  | "glow"
  | "raw-html";

export type BlockGroup = "content" | "action" | "data" | "layout";

export type FieldType =
  | "text"
  | "textarea"
  | "url"
  | "number"
  | "select"
  | "color"
  | "boolean"
  | "list";

export interface FieldDefinition {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
  /** `select` only. */
  options?: Array<{ value: string; label: string }>;
  /** `list` only: the shape of one row, and the row added by "Add item". */
  itemFields?: FieldDefinition[];
  defaultItem?: Record<string, any>;
  /** `list` only: which item field is used as the collapsed row label. */
  itemLabelKey?: string;
}

export interface BlockRenderContext {
  theme: EmailTheme;
}

export interface BlockDefinition<P extends Record<string, any> = any> {
  type: BlockType;
  label: string;
  group: BlockGroup;
  description: string;
  defaultProps: P;
  fields: FieldDefinition[];
  render: (props: P, ctx: BlockRenderContext) => React.ReactElement | null;
}
