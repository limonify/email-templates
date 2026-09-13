import { BLOCK_REGISTRY, createBlock, createBlockId } from "./blocks.js";
import type { BlockType, EmailBlock, EmailDocument } from "./types.js";

const DEFAULT_LOGO =
  "https://raw.githubusercontent.com/limonify/email-templates/main/.github/assets/logo.png";

export function createEmptyDocument(
  name: string = "Untitled template",
): EmailDocument {
  const now = new Date().toISOString();
  return {
    version: 1,
    id: createBlockId("doc"),
    name,
    meta: { subject: "", previewText: "" },
    mode: "dark",
    theme: { cardStyle: "double-frame" },
    branding: {
      appName: "Limonify",
      logoUrl: DEFAULT_LOGO,
      logoWidth: 26,
      logoHeight: 26,
      showBrandName: true,
      supportUrl: "https://limonify.com/support",
      supportText: "Need help or have questions?",
    },
    blocks: [],
    createdAt: now,
    updatedAt: now,
  };
}

function document(
  name: string,
  blocks: EmailBlock[],
  overrides: Partial<EmailDocument> = {},
): EmailDocument {
  return { ...createEmptyDocument(name), ...overrides, blocks };
}

export interface DocumentPreset {
  id: string;
  label: string;
  description: string;
  build: () => EmailDocument;
}

/**
 * Starting points for the editor. These mirror four of the built-in templates
 * closely enough to feel familiar; the other templates stay `.tsx` and are
 * browsable in the preview gallery.
 */
export const DOCUMENT_PRESETS: DocumentPreset[] = [
  {
    id: "blank",
    label: "Blank",
    description: "Empty canvas with branding and footer already wired",
    build: () => createEmptyDocument("Blank template"),
  },
  {
    id: "otp",
    label: "Verification code",
    description: "Badge, heading, OTP slots and an expiry note",
    build: () =>
      document(
        "Verification code",
        [
          createBlock("badge", { text: "Verification code" }),
          createBlock("heading", { text: "Sign in verification" }),
          createBlock("text", {
            text: "Use the verification code below to complete your sign in request:",
          }),
          createBlock("otp", { code: "{{ .Code }}" }),
          createBlock("text", {
            text: "This code expires in {{ .ExpiresIn }}. If you did not request it, you can safely ignore this email.",
            size: "12px",
            lineHeight: "18px",
          }),
        ],
        { meta: { subject: "Your verification code", previewText: "" } },
      ),
  },
  {
    id: "welcome",
    label: "Welcome & onboarding",
    description: "Greeting, setup checklist and a dashboard button",
    build: () =>
      document(
        "Welcome",
        [
          createBlock("badge", { text: "Welcome", variant: "success" }),
          createBlock("heading", { text: "Welcome to {{ .AppName }}" }),
          createBlock("text", {
            text: "Hi {{ .UserName }}, your account is ready. Here is how to get the most out of it in the first five minutes:",
          }),
          createBlock("steps"),
          createBlock("button", {
            label: "Open dashboard",
            href: "{{ .DashboardURL }}",
          }),
        ],
        { meta: { subject: "Welcome to {{ .AppName }}", previewText: "" } },
      ),
  },
  {
    id: "announcement",
    label: "Announcement",
    description: "Broadcast with an info card and a call to action",
    build: () =>
      document(
        "Announcement",
        [
          createBlock("badge", { text: "Announcement" }),
          createBlock("heading", { text: "{{ .Subject }}" }),
          createBlock("text", { text: "{{ .Message }}" }),
          createBlock("info-card"),
          createBlock("button", {
            label: "Read more",
            href: "{{ .ActionURL }}",
          }),
        ],
        { meta: { subject: "{{ .Subject }}", previewText: "" } },
      ),
  },
  {
    id: "security-alert",
    label: "Security alert",
    description: "Session details card with a secure-account action",
    build: () =>
      document(
        "Security alert",
        [
          createBlock("badge", { text: "Security alert", variant: "warning" }),
          createBlock("heading", { text: "New sign in to your account" }),
          createBlock("text", {
            text: "We noticed a sign in from a device we do not recognise. If this was you, no action is needed.",
          }),
          createBlock("device-session"),
          createBlock("button", {
            label: "Secure your account",
            href: "{{ .SecureAccountURL }}",
          }),
        ],
        { meta: { subject: "New sign in to your account", previewText: "" } },
      ),
  },
];

/**
 * Accepts JSON from disk or from the editor's import dialog, which may come
 * from an older version or a hand-edited file. Unknown block types are dropped
 * rather than crashing the render.
 */
export function parseDocument(input: unknown): EmailDocument {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid document: expected a JSON object");
  }
  const raw = input as Partial<EmailDocument>;
  if (!Array.isArray(raw.blocks)) {
    throw new Error("Invalid document: `blocks` must be an array");
  }

  const base = createEmptyDocument(raw.name || "Imported template");
  const blocks = raw.blocks
    .filter(
      (block): block is EmailBlock =>
        Boolean(block) &&
        typeof block === "object" &&
        typeof (block as EmailBlock).type === "string" &&
        Boolean(BLOCK_REGISTRY[(block as EmailBlock).type as BlockType]),
    )
    .map((block) => ({
      id: block.id || createBlockId(block.type),
      type: block.type,
      props: { ...(block.props || {}) },
    }));

  return {
    ...base,
    ...raw,
    version: 1,
    id: raw.id || base.id,
    meta: { ...base.meta, ...(raw.meta || {}) },
    mode: raw.mode === "light" ? "light" : "dark",
    theme: { ...base.theme, ...(raw.theme || {}) },
    branding: { ...base.branding, ...(raw.branding || {}) },
    blocks,
  };
}
