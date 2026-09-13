import * as React from "react";
import { Heading, Hr, Img, Link, Text } from "@react-email/components";
import { EmailBadge } from "../components/badge.js";
import { EmailButton } from "../components/button.js";
import { CodeBox } from "../components/code-box.js";
import { DeviceSessionCard } from "../components/device-session-card.js";
import { GradientGlow } from "../components/gradient-glow.js";
import { InfoCard } from "../components/info-card.js";
import { StepsList } from "../components/steps-list.js";
import { OTPField } from "../components/otp-field.js";
import { nestedSurface, strongSurface, toneColor } from "../theme/surfaces.js";
import type {
  BlockDefinition,
  BlockRenderContext,
  BlockType,
  EmailBlock,
} from "./types.js";

const SOCIAL_LABELS: Record<string, string> = {
  github: "GitHub",
  twitter: "X",
  linkedin: "LinkedIn",
  discord: "Discord",
  website: "Website",
};

const ALIGN_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

/**
 * A textarea holds one string, but email copy reads as paragraphs. Blank-line
 * separated chunks become separate <Text> elements so spacing survives in
 * clients that ignore `white-space`.
 */
function paragraphs(value: string): string[] {
  return String(value ?? "")
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function toLength(value: string | number | undefined, fallback: string) {
  if (value === undefined || value === "") return fallback;
  return typeof value === "number" ? `${value}px` : value;
}

export const BLOCK_REGISTRY: Record<BlockType, BlockDefinition> = {
  heading: {
    type: "heading",
    label: "Heading",
    group: "content",
    description: "Section title",
    defaultProps: {
      text: "Sign in verification",
      size: "18px",
      weight: "600",
      align: "left",
    },
    fields: [
      { key: "text", label: "Text", type: "text" },
      { key: "size", label: "Font size", type: "text", placeholder: "18px" },
      {
        key: "weight",
        label: "Weight",
        type: "select",
        options: [
          { value: "500", label: "Medium (500)" },
          { value: "600", label: "Semibold (600)" },
          { value: "700", label: "Bold (700)" },
          { value: "800", label: "Extrabold (800)" },
        ],
      },
      { key: "align", label: "Align", type: "select", options: ALIGN_OPTIONS },
    ],
    render: (props, { theme }) => (
      <Heading
        style={{
          fontSize: toLength(props.size, theme.headingSize || "18px"),
          fontWeight: (props.weight || theme.headingWeight || "600") as any,
          color: theme.foreground,
          letterSpacing: theme.headingLetterSpacing || "-0.025em",
          textAlign: props.align || "left",
          margin: "0 0 8px",
          fontFamily: theme.fontFamily,
        }}
      >
        {props.text}
      </Heading>
    ),
  },

  text: {
    type: "text",
    label: "Paragraph",
    group: "content",
    description: "Body copy, blank line separates paragraphs",
    defaultProps: {
      text: "Use the verification code below to complete your sign in request:",
      size: "13px",
      lineHeight: "20px",
      align: "left",
      emphasis: "muted",
    },
    fields: [
      {
        key: "text",
        label: "Text",
        type: "textarea",
        help: "Backend placeholders such as {{ .UserName }} are preserved.",
      },
      { key: "size", label: "Font size", type: "text", placeholder: "13px" },
      {
        key: "lineHeight",
        label: "Line height",
        type: "text",
        placeholder: "20px",
      },
      { key: "align", label: "Align", type: "select", options: ALIGN_OPTIONS },
      {
        key: "emphasis",
        label: "Color",
        type: "select",
        options: [
          { value: "muted", label: "Muted" },
          { value: "strong", label: "Foreground" },
        ],
      },
    ],
    render: (props, { theme }) => {
      const parts = paragraphs(props.text);
      const color =
        props.emphasis === "strong" ? theme.foreground : theme.mutedForeground;
      return (
        <>
          {parts.map((part, idx) => (
            <Text
              key={idx}
              style={{
                fontSize: toLength(props.size, theme.bodySize || "13px"),
                lineHeight: toLength(
                  props.lineHeight,
                  theme.bodyLineHeight || "20px",
                ),
                color,
                textAlign: props.align || "left",
                margin: idx === parts.length - 1 ? "0 0 12px" : "0 0 10px",
                fontFamily: theme.fontFamily,
              }}
            >
              {part}
            </Text>
          ))}
        </>
      );
    },
  },

  button: {
    type: "button",
    label: "Button",
    group: "action",
    description: "Primary call to action",
    defaultProps: {
      label: "Open dashboard",
      href: "https://example.com",
      align: "left",
      size: "md",
    },
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "href", label: "URL", type: "url" },
      { key: "align", label: "Align", type: "select", options: ALIGN_OPTIONS },
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ],
      },
    ],
    render: (props, { theme }) => (
      <EmailButton
        href={props.href}
        align={props.align || "left"}
        size={props.size || "md"}
        theme={theme}
      >
        {props.label}
      </EmailButton>
    ),
  },

  "button-group": {
    type: "button-group",
    label: "Button group",
    group: "action",
    description: "Primary and secondary actions side by side",
    defaultProps: {
      layout: "attached",
      align: "left",
      buttons: [
        {
          label: "Open dashboard",
          href: "https://example.com",
          variant: "primary",
        },
        {
          label: "View docs",
          href: "https://example.com/docs",
          variant: "secondary",
        },
      ],
    },
    fields: [
      {
        key: "layout",
        label: "Layout",
        type: "select",
        options: [
          { value: "attached", label: "Attached" },
          { value: "spaced", label: "Spaced" },
        ],
      },
      { key: "align", label: "Align", type: "select", options: ALIGN_OPTIONS },
      {
        key: "buttons",
        label: "Buttons",
        type: "list",
        itemLabelKey: "label",
        defaultItem: {
          label: "New action",
          href: "https://",
          variant: "secondary",
        },
        itemFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "URL", type: "url" },
          {
            key: "variant",
            label: "Variant",
            type: "select",
            options: [
              { value: "primary", label: "Primary" },
              { value: "secondary", label: "Secondary" },
            ],
          },
        ],
      },
    ],
    render: (props, { theme }) => {
      const buttons: Array<Record<string, any>> = props.buttons || [];
      if (!buttons.length) return null;

      const attached = props.layout !== "spaced";
      const radius = theme.buttonRadius || "8px";
      const surface = nestedSurface(theme);

      return (
        <div style={{ textAlign: props.align || "left", margin: "24px 0" }}>
          <table
            style={{
              display: "inline-table",
              borderCollapse: "separate",
              borderSpacing: attached ? "0" : "8px",
              fontFamily: theme.fontFamily,
            }}
          >
            <tbody>
              <tr>
                {buttons.map((button, index) => {
                  const isPrimary = button.variant !== "secondary";
                  // Attached buttons round only the outer corners, the way the
                  // UI's ButtonGroup squares off the inner edges.
                  const first = index === 0;
                  const last = index === buttons.length - 1;
                  const corners = attached
                    ? {
                        borderTopLeftRadius: first ? radius : "0",
                        borderBottomLeftRadius: first ? radius : "0",
                        borderTopRightRadius: last ? radius : "0",
                        borderBottomRightRadius: last ? radius : "0",
                      }
                    : { borderRadius: radius };

                  return (
                    <td key={index} style={{ padding: 0 }}>
                      <Link
                        href={button.href}
                        style={{
                          display: "inline-block",
                          padding: theme.buttonPadding || "10px 20px",
                          fontSize: theme.buttonFontSize || "13px",
                          fontWeight: "500",
                          letterSpacing: "-0.01em",
                          textAlign: "center",
                          textDecoration: "none",
                          fontFamily: theme.fontFamily,
                          backgroundColor: isPrimary
                            ? theme.primary
                            : surface.bg,
                          color: isPrimary
                            ? theme.primaryForeground
                            : theme.foreground,
                          border: `1px solid ${
                            isPrimary
                              ? theme.primary === "#ffffff"
                                ? "#e5e5e5"
                                : theme.primary
                              : surface.border
                          }`,
                          ...corners,
                        }}
                      >
                        {button.label}
                      </Link>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      );
    },
  },

  badge: {
    type: "badge",
    label: "Badge",
    group: "content",
    description: "Small status pill above the heading",
    defaultProps: { text: "Verification code", variant: "neutral", dot: false },
    fields: [
      { key: "text", label: "Text", type: "text" },
      {
        key: "variant",
        label: "Variant",
        type: "select",
        options: [
          { value: "neutral", label: "Neutral" },
          { value: "success", label: "Success" },
          { value: "warning", label: "Warning" },
          { value: "error", label: "Error" },
          { value: "outline", label: "Outline" },
        ],
      },
      { key: "dot", label: "Leading dot", type: "boolean" },
    ],
    render: (props, { theme }) => (
      <EmailBadge
        variant={props.variant || "neutral"}
        dot={Boolean(props.dot)}
        theme={theme}
      >
        {props.text}
      </EmailBadge>
    ),
  },

  divider: {
    type: "divider",
    label: "Divider",
    group: "layout",
    description: "Horizontal rule",
    defaultProps: { spacing: "20px", variant: "solid" },
    fields: [
      {
        key: "spacing",
        label: "Vertical spacing",
        type: "text",
        placeholder: "20px",
      },
      {
        key: "variant",
        label: "Style",
        type: "select",
        options: [
          { value: "solid", label: "Solid rule" },
          { value: "fade", label: "Faded (design system)" },
        ],
      },
    ],
    render: (props, { theme }) =>
      props.variant === "fade" ? (
        // Mirrors the UI's Separator, which fades out towards both ends.
        <div
          style={{
            height: "1px",
            width: "100%",
            background: `linear-gradient(to right, transparent, ${theme.surfaceBorder} 26%, ${theme.surfaceBorder} 74%, transparent)`,
            margin: `${toLength(props.spacing, "20px")} 0`,
          }}
        />
      ) : (
        <Hr
          style={{
            borderColor: theme.surfaceBorder,
            borderWidth: "1px 0 0",
            margin: `${toLength(props.spacing, "20px")} 0`,
          }}
        />
      ),
  },

  spacer: {
    type: "spacer",
    label: "Spacer",
    group: "layout",
    description: "Empty vertical space",
    defaultProps: { height: "16px" },
    fields: [
      { key: "height", label: "Height", type: "text", placeholder: "16px" },
    ],
    render: (props) => (
      <div
        style={{
          height: toLength(props.height, "16px"),
          lineHeight: toLength(props.height, "16px"),
          fontSize: "1px",
        }}
      >
        &nbsp;
      </div>
    ),
  },

  image: {
    type: "image",
    label: "Image",
    group: "content",
    description: "Hero image or screenshot",
    defaultProps: {
      src: "https://raw.githubusercontent.com/limonify/email-templates/main/.github/assets/logo.png",
      alt: "",
      width: "100%",
      align: "center",
      radius: "8px",
      href: "",
    },
    fields: [
      { key: "src", label: "Image URL", type: "url" },
      { key: "alt", label: "Alt text", type: "text" },
      {
        key: "width",
        label: "Width",
        type: "text",
        placeholder: "100% or 320px",
      },
      { key: "align", label: "Align", type: "select", options: ALIGN_OPTIONS },
      { key: "radius", label: "Corner radius", type: "text" },
      { key: "href", label: "Link to (optional)", type: "url" },
    ],
    render: (props) => {
      const img = (
        <Img
          src={props.src}
          alt={props.alt || ""}
          style={{
            width: toLength(props.width, "100%"),
            maxWidth: "100%",
            borderRadius: toLength(props.radius, "8px"),
            display: "inline-block",
            border: "0",
          }}
        />
      );
      return (
        <div style={{ textAlign: props.align || "center", margin: "16px 0" }}>
          {props.href ? <Link href={props.href}>{img}</Link> : img}
        </div>
      );
    },
  },

  "image-text": {
    type: "image-text",
    label: "Image + text",
    group: "content",
    description: "Thumbnail beside a title and description",
    defaultProps: {
      src: "https://raw.githubusercontent.com/limonify/email-templates/main/.github/assets/logo.png",
      alt: "",
      imageWidth: "96px",
      side: "left",
      title: "Design tokens v2",
      text: "Synchronised palettes across web, native and email.",
      linkLabel: "Read more",
      href: "",
    },
    fields: [
      { key: "src", label: "Image URL", type: "url" },
      { key: "alt", label: "Alt text", type: "text" },
      {
        key: "imageWidth",
        label: "Image width",
        type: "text",
        placeholder: "96px",
      },
      {
        key: "side",
        label: "Image side",
        type: "select",
        options: [
          { value: "left", label: "Left" },
          { value: "right", label: "Right" },
        ],
      },
      { key: "title", label: "Title", type: "text" },
      { key: "text", label: "Text", type: "textarea" },
      { key: "linkLabel", label: "Link label", type: "text" },
      { key: "href", label: "Link URL", type: "url" },
    ],
    render: (props, { theme }) => {
      const media = (
        <td
          style={{
            width: toLength(props.imageWidth, "96px"),
            verticalAlign: "top",
            padding: props.side === "right" ? "0 0 0 14px" : "0 14px 0 0",
          }}
        >
          <Img
            src={props.src}
            alt={props.alt || ""}
            style={{
              width: toLength(props.imageWidth, "96px"),
              maxWidth: "100%",
              borderRadius: theme.radius,
              display: "block",
              border: "0",
            }}
          />
        </td>
      );
      const copy = (
        <td style={{ verticalAlign: "top" }}>
          <Text
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: theme.foreground,
              letterSpacing: "-0.01em",
              margin: "0 0 4px",
              fontFamily: theme.fontFamily,
            }}
          >
            {props.title}
          </Text>
          <Text
            style={{
              fontSize: "12px",
              lineHeight: "18px",
              color: theme.mutedForeground,
              margin: 0,
              fontFamily: theme.fontFamily,
            }}
          >
            {props.text}
          </Text>
          {props.href && props.linkLabel ? (
            <Link
              href={props.href}
              style={{
                display: "inline-block",
                marginTop: "6px",
                fontSize: "12px",
                fontWeight: "500",
                color: theme.foreground,
                textDecoration: "underline",
                fontFamily: theme.fontFamily,
              }}
            >
              {props.linkLabel}
            </Link>
          ) : null}
        </td>
      );

      return (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            margin: "18px 0",
          }}
        >
          <tbody>
            <tr>
              {props.side === "right" ? (
                <>
                  {copy}
                  {media}
                </>
              ) : (
                <>
                  {media}
                  {copy}
                </>
              )}
            </tr>
          </tbody>
        </table>
      );
    },
  },

  gallery: {
    type: "gallery",
    label: "Gallery",
    group: "content",
    description: "Grid of images",
    defaultProps: {
      perRow: "2",
      images: [
        {
          src: "https://raw.githubusercontent.com/limonify/email-templates/main/.github/assets/logo.png",
          alt: "",
          href: "",
        },
        {
          src: "https://raw.githubusercontent.com/limonify/email-templates/main/.github/assets/logo.png",
          alt: "",
          href: "",
        },
      ],
    },
    fields: [
      {
        key: "perRow",
        label: "Per row",
        type: "select",
        options: [
          { value: "2", label: "2 columns" },
          { value: "3", label: "3 columns" },
        ],
      },
      {
        key: "images",
        label: "Images",
        type: "list",
        itemLabelKey: "alt",
        defaultItem: { src: "https://", alt: "", href: "" },
        itemFields: [
          { key: "src", label: "Image URL", type: "url" },
          { key: "alt", label: "Alt text", type: "text" },
          { key: "href", label: "Link URL", type: "url" },
        ],
      },
    ],
    render: (props, { theme }) => {
      const images: Array<Record<string, any>> = props.images || [];
      const perRow = Number(props.perRow) === 3 ? 3 : 2;
      const rows: Array<Array<Record<string, any>>> = [];
      for (let i = 0; i < images.length; i += perRow) {
        rows.push(images.slice(i, i + perRow));
      }

      return (
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "8px",
            margin: "14px -8px",
            fontFamily: theme.fontFamily,
          }}
        >
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((image, index) => {
                  const img = (
                    <Img
                      src={image.src}
                      alt={image.alt || ""}
                      style={{
                        width: "100%",
                        borderRadius: theme.radius,
                        display: "block",
                        border: "0",
                      }}
                    />
                  );
                  return (
                    <td
                      key={index}
                      style={{
                        width: `${Math.round(100 / perRow)}%`,
                        verticalAlign: "top",
                      }}
                    >
                      {image.href ? <Link href={image.href}>{img}</Link> : img}
                    </td>
                  );
                })}
                {/* Keep a short last row aligned with the rows above it. */}
                {row.length < perRow
                  ? Array.from({ length: perRow - row.length }).map((_, i) => (
                      <td key={`filler-${i}`} />
                    ))
                  : null}
              </tr>
            ))}
          </tbody>
        </table>
      );
    },
  },

  columns: {
    type: "columns",
    label: "Columns",
    group: "content",
    description: "Two or three columns of copy",
    defaultProps: {
      boxed: false,
      columns: [
        {
          title: "Fast",
          text: "Pre-compiled templates render in under a millisecond.",
          linkLabel: "",
          href: "",
        },
        {
          title: "Consistent",
          text: "Every block reads its colors from your design tokens.",
          linkLabel: "",
          href: "",
        },
      ],
    },
    fields: [
      { key: "boxed", label: "Boxed columns", type: "boolean" },
      {
        key: "columns",
        label: "Columns",
        type: "list",
        itemLabelKey: "title",
        defaultItem: { title: "Column", text: "", linkLabel: "", href: "" },
        itemFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
          { key: "linkLabel", label: "Link label", type: "text" },
          { key: "href", label: "Link URL", type: "url" },
        ],
      },
    ],
    render: (props, { theme }) => {
      const columns: Array<Record<string, any>> = props.columns || [];
      if (!columns.length) return null;
      const surface = nestedSurface(theme);
      const width = `${Math.round(100 / columns.length)}%`;

      return (
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: props.boxed ? "8px" : "12px",
            margin: props.boxed ? "14px -8px" : "14px -12px",
            fontFamily: theme.fontFamily,
          }}
        >
          <tbody>
            <tr>
              {columns.map((column, index) => (
                <td
                  key={index}
                  style={{
                    width,
                    verticalAlign: "top",
                    ...(props.boxed
                      ? {
                          backgroundColor: surface.bg,
                          border: `1px solid ${surface.border}`,
                          borderRadius: theme.radius,
                          padding: "12px 14px",
                        }
                      : {}),
                  }}
                >
                  <Text
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: theme.foreground,
                      letterSpacing: "-0.01em",
                      margin: "0 0 4px",
                      fontFamily: theme.fontFamily,
                    }}
                  >
                    {column.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: "12px",
                      lineHeight: "18px",
                      color: theme.mutedForeground,
                      margin: 0,
                      fontFamily: theme.fontFamily,
                    }}
                  >
                    {column.text}
                  </Text>
                  {column.href && column.linkLabel ? (
                    <Link
                      href={column.href}
                      style={{
                        display: "inline-block",
                        marginTop: "6px",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: theme.foreground,
                        textDecoration: "underline",
                        fontFamily: theme.fontFamily,
                      }}
                    >
                      {column.linkLabel}
                    </Link>
                  ) : null}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      );
    },
  },

  otp: {
    type: "otp",
    label: "OTP code",
    group: "data",
    description: "One-time code in slot boxes",
    defaultProps: { code: "{{ .Code }}" },
    fields: [
      {
        key: "code",
        label: "Code",
        type: "text",
        help: "Six digits render as slots; anything else falls back to a single box.",
      },
      { key: "slotWidth", label: "Slot width", type: "text" },
      { key: "slotHeight", label: "Slot height", type: "text" },
      { key: "digitSize", label: "Digit size", type: "text" },
      { key: "slotRadius", label: "Slot radius", type: "text" },
    ],
    render: (props, { theme }) => (
      <OTPField
        code={props.code ?? ""}
        slotWidth={props.slotWidth || undefined}
        slotHeight={props.slotHeight || undefined}
        digitSize={props.digitSize || undefined}
        slotRadius={props.slotRadius || undefined}
        theme={theme}
      />
    ),
  },

  "code-box": {
    type: "code-box",
    label: "Code box",
    group: "data",
    description: "Monospace value on an inset surface",
    defaultProps: { code: "LMN-2026-INVITE" },
    fields: [{ key: "code", label: "Value", type: "text" }],
    render: (props, { theme }) => (
      <CodeBox code={props.code ?? ""} theme={theme} />
    ),
  },

  "info-card": {
    type: "info-card",
    label: "Info card",
    group: "content",
    description: "Boxed note with an optional title",
    defaultProps: {
      title: "Scheduled maintenance",
      text: "Upgrades run on Sunday between 02:00 and 02:30 UTC with zero expected downtime.",
    },
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "text", label: "Text", type: "textarea" },
    ],
    render: (props, { theme }) => (
      <InfoCard title={props.title || undefined} theme={theme}>
        <Text
          style={{
            fontSize: "12px",
            color: theme.mutedForeground,
            lineHeight: "18px",
            margin: 0,
            fontFamily: theme.fontFamily,
          }}
        >
          {props.text}
        </Text>
      </InfoCard>
    ),
  },

  steps: {
    type: "steps",
    label: "Steps",
    group: "data",
    description: "Numbered onboarding checklist",
    defaultProps: {
      steps: [
        {
          number: 1,
          title: "Complete your profile",
          description: "Add your name and avatar so teammates recognise you.",
        },
        {
          number: 2,
          title: "Create your first project",
          description: "Projects keep deployments and environments together.",
        },
      ],
    },
    fields: [
      {
        key: "steps",
        label: "Steps",
        type: "list",
        itemLabelKey: "title",
        defaultItem: { number: 1, title: "New step", description: "" },
        itemFields: [
          { key: "number", label: "Number", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "completed", label: "Completed", type: "boolean" },
        ],
      },
    ],
    render: (props, { theme }) => (
      <StepsList steps={props.steps || []} theme={theme} />
    ),
  },

  "device-session": {
    type: "device-session",
    label: "Device session",
    group: "data",
    description: "Device, location and IP of a sign-in",
    defaultProps: {
      device: "MacBook Pro (macOS 15.4)",
      browser: "Safari 18.3",
      location: "San Francisco, CA, United States",
      ipAddress: "192.0.2.14",
      timestamp: "Just now",
    },
    fields: [
      { key: "device", label: "Device", type: "text" },
      { key: "browser", label: "Browser", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "ipAddress", label: "IP address", type: "text" },
      { key: "timestamp", label: "Timestamp", type: "text" },
    ],
    render: (props, { theme }) => (
      <DeviceSessionCard
        device={props.device}
        browser={props.browser}
        location={props.location}
        ipAddress={props.ipAddress}
        timestamp={props.timestamp}
        theme={theme}
      />
    ),
  },

  "key-values": {
    type: "key-values",
    label: "Summary table",
    group: "data",
    description: "Label/value rows for receipts and details",
    defaultProps: {
      title: "",
      rows: [
        { label: "Plan", value: "Limonify Pro (Annual)" },
        { label: "Amount", value: "$49.00", emphasis: true },
      ],
    },
    fields: [
      { key: "title", label: "Title", type: "text" },
      {
        key: "rows",
        label: "Rows",
        type: "list",
        itemLabelKey: "label",
        defaultItem: { label: "Label", value: "Value", emphasis: false },
        itemFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "value", label: "Value", type: "text" },
          { key: "emphasis", label: "Emphasised", type: "boolean" },
        ],
      },
    ],
    render: (props, { theme }) => {
      const rows: Array<Record<string, any>> = props.rows || [];
      return (
        <div
          style={{
            backgroundColor: theme.surface,
            border: `1px solid ${theme.surfaceBorder}`,
            borderRadius: theme.radius,
            padding: "14px 16px",
            margin: "20px 0",
          }}
        >
          {props.title ? (
            <Text
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: theme.foreground,
                margin: "0 0 8px",
                fontFamily: theme.fontFamily,
              }}
            >
              {props.title}
            </Text>
          ) : null}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: theme.fontFamily,
            }}
          >
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td
                    style={{
                      padding: "5px 0",
                      fontSize: "12px",
                      color: theme.mutedForeground,
                    }}
                  >
                    {row.label}
                  </td>
                  <td
                    style={{
                      padding: "5px 0",
                      fontSize: row.emphasis ? "13px" : "12px",
                      fontWeight: row.emphasis ? "600" : "400",
                      color: theme.foreground,
                      textAlign: "right",
                    }}
                  >
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },

  progress: {
    type: "progress",
    label: "Progress meter",
    group: "data",
    description: "Quota or usage bar with a caption",
    defaultProps: {
      label: "API requests",
      value: "88%",
      caption: "88,420 of 100,000 requests this month",
      tone: "warning",
    },
    fields: [
      { key: "label", label: "Label", type: "text" },
      {
        key: "value",
        label: "Value",
        type: "text",
        placeholder: "88%",
        help: "A percentage - the bar fills to this width.",
      },
      { key: "caption", label: "Caption", type: "text" },
      {
        key: "tone",
        label: "Tone",
        type: "select",
        options: [
          { value: "accent", label: "Accent" },
          { value: "success", label: "Success" },
          { value: "warning", label: "Warning" },
          { value: "error", label: "Error" },
        ],
      },
    ],
    render: (props, { theme }) => {
      const surface = nestedSurface(theme);
      const value = String(props.value ?? "0%");
      const width = value.includes("%") ? value : `${value}%`;

      return (
        <div
          style={{
            backgroundColor: surface.bg,
            border: `1px solid ${surface.border}`,
            borderRadius: theme.radius,
            padding: "14px 16px",
            margin: "18px 0",
            fontFamily: theme.fontFamily,
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ fontSize: "12px", color: theme.mutedForeground }}>
                  {props.label}
                </td>
                <td
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: theme.foreground,
                    textAlign: "right",
                  }}
                >
                  {value}
                </td>
              </tr>
            </tbody>
          </table>

          <div
            style={{
              width: "100%",
              height: "6px",
              borderRadius: "999px",
              backgroundColor: strongSurface(theme),
              overflow: "hidden",
              margin: props.caption ? "8px 0 10px" : "8px 0 0",
            }}
          >
            <div
              style={{
                width,
                height: "6px",
                borderRadius: "999px",
                backgroundColor: toneColor(theme, props.tone || "accent"),
              }}
            />
          </div>

          {props.caption ? (
            <Text
              style={{
                fontSize: "11px",
                color: theme.mutedForeground,
                margin: 0,
                fontFamily: theme.fontFamily,
              }}
            >
              {props.caption}
            </Text>
          ) : null}
        </div>
      );
    },
  },

  "link-list": {
    type: "link-list",
    label: "Link list",
    group: "content",
    description: "Newsletter-style list of links",
    defaultProps: {
      title: "Highlights",
      links: [
        {
          label: "OKLCH parser ships in v2.4",
          href: "https://example.com/changelog",
          description: "Design tokens now resolve straight from your CSS.",
        },
      ],
    },
    fields: [
      { key: "title", label: "Title", type: "text" },
      {
        key: "links",
        label: "Links",
        type: "list",
        itemLabelKey: "label",
        defaultItem: { label: "New link", href: "https://", description: "" },
        itemFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "href", label: "URL", type: "url" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    render: (props, { theme }) => {
      const links: Array<Record<string, any>> = props.links || [];
      return (
        <div style={{ margin: "18px 0" }}>
          {props.title ? (
            <Text
              style={{
                fontSize: "11px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: theme.mutedForeground,
                margin: "0 0 10px",
                fontFamily: theme.fontFamily,
              }}
            >
              {props.title}
            </Text>
          ) : null}
          {links.map((link, idx) => (
            <div
              key={idx}
              style={{
                paddingBottom: "12px",
                marginBottom: "12px",
                borderBottom:
                  idx === links.length - 1
                    ? "none"
                    : `1px solid ${theme.surfaceBorder}`,
              }}
            >
              <Link
                href={link.href}
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: theme.foreground,
                  textDecoration: "none",
                  fontFamily: theme.fontFamily,
                }}
              >
                {link.label}
              </Link>
              {link.description ? (
                <Text
                  style={{
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: theme.mutedForeground,
                    margin: "4px 0 0",
                    fontFamily: theme.fontFamily,
                  }}
                >
                  {link.description}
                </Text>
              ) : null}
            </div>
          ))}
        </div>
      );
    },
  },

  "bullet-list": {
    type: "bullet-list",
    label: "Bullet list",
    group: "content",
    description: "Simple marked list",
    defaultProps: {
      marker: "disc",
      items: [
        { text: "Unlimited projects and environments" },
        { text: "Priority support with a 4-hour response time" },
      ],
    },
    fields: [
      {
        key: "marker",
        label: "Marker",
        type: "select",
        options: [
          { value: "disc", label: "Dot" },
          { value: "dash", label: "Dash" },
          { value: "check", label: "Check" },
        ],
      },
      {
        key: "items",
        label: "Items",
        type: "list",
        itemLabelKey: "text",
        defaultItem: { text: "New item" },
        itemFields: [{ key: "text", label: "Text", type: "textarea" }],
      },
    ],
    render: (props, { theme }) => {
      const items: Array<Record<string, any>> = props.items || [];
      const marker =
        props.marker === "check" ? "✓" : props.marker === "dash" ? "–" : "•";

      return (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            margin: "14px 0 18px",
            fontFamily: theme.fontFamily,
          }}
        >
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td
                  style={{
                    width: "18px",
                    verticalAlign: "top",
                    paddingBottom: "8px",
                    fontSize: "13px",
                    lineHeight: "20px",
                    color:
                      props.marker === "check"
                        ? theme.accent
                        : theme.mutedForeground,
                  }}
                >
                  {marker}
                </td>
                <td
                  style={{
                    verticalAlign: "top",
                    paddingBottom: "8px",
                    fontSize: "13px",
                    lineHeight: "20px",
                    color: theme.mutedForeground,
                  }}
                >
                  {item.text}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    },
  },

  quote: {
    type: "quote",
    label: "Quote",
    group: "content",
    description: "Pull quote with an accent rule",
    defaultProps: {
      text: "We replaced three hand-written email templates with one document and never looked back.",
      author: "Sarah Connor",
      role: "Engineering Lead, Acme",
    },
    fields: [
      { key: "text", label: "Quote", type: "textarea" },
      { key: "author", label: "Author", type: "text" },
      { key: "role", label: "Role", type: "text" },
    ],
    render: (props, { theme }) => (
      <div
        style={{
          borderLeft: `2px solid ${theme.accent}`,
          padding: "2px 0 2px 14px",
          margin: "18px 0",
          fontFamily: theme.fontFamily,
        }}
      >
        <Text
          style={{
            fontSize: "13px",
            lineHeight: "20px",
            color: theme.foreground,
            margin: "0 0 6px",
            fontFamily: theme.fontFamily,
          }}
        >
          {props.text}
        </Text>
        {props.author ? (
          <Text
            style={{
              fontSize: "11px",
              color: theme.mutedForeground,
              margin: 0,
              fontFamily: theme.fontFamily,
            }}
          >
            {props.author}
            {props.role ? ` · ${props.role}` : ""}
          </Text>
        ) : null}
      </div>
    ),
  },

  "social-links": {
    type: "social-links",
    label: "Social links",
    group: "content",
    description: "Row of platform chips",
    defaultProps: {
      align: "left",
      links: [
        { platform: "github", url: "https://github.com/limonify", label: "" },
        { platform: "twitter", url: "https://twitter.com/limonify", label: "" },
      ],
    },
    fields: [
      { key: "align", label: "Align", type: "select", options: ALIGN_OPTIONS },
      {
        key: "links",
        label: "Links",
        type: "list",
        itemLabelKey: "platform",
        defaultItem: { platform: "website", url: "https://", label: "" },
        itemFields: [
          {
            key: "platform",
            label: "Platform",
            type: "select",
            options: [
              { value: "github", label: "GitHub" },
              { value: "twitter", label: "X / Twitter" },
              { value: "linkedin", label: "LinkedIn" },
              { value: "discord", label: "Discord" },
              { value: "website", label: "Website" },
            ],
          },
          { key: "url", label: "URL", type: "url" },
          { key: "label", label: "Label override", type: "text" },
        ],
      },
    ],
    render: (props, { theme }) => {
      const links: Array<Record<string, any>> = props.links || [];
      const surface = nestedSurface(theme);

      return (
        <div
          style={{
            textAlign: props.align || "left",
            margin: "18px 0",
            fontFamily: theme.fontFamily,
          }}
        >
          {/* Chips rather than icons: Gmail strips inline SVG, and a remote
              icon sprite disappears entirely when images are blocked. */}
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              style={{
                display: "inline-block",
                padding: "5px 10px",
                marginRight: "8px",
                marginBottom: "6px",
                borderRadius: "999px",
                backgroundColor: surface.bg,
                border: `1px solid ${surface.border}`,
                fontSize: "11px",
                fontWeight: "500",
                letterSpacing: "0.02em",
                color: theme.foreground,
                textDecoration: "none",
                fontFamily: theme.fontFamily,
              }}
            >
              {link.label || SOCIAL_LABELS[link.platform] || link.platform}
            </Link>
          ))}
        </div>
      );
    },
  },

  glow: {
    type: "glow",
    label: "Accent glow",
    group: "layout",
    description: "Thin accent gradient line",
    defaultProps: {},
    fields: [],
    render: (_props, { theme }) => <GradientGlow theme={theme} />,
  },

  "raw-html": {
    type: "raw-html",
    label: "Raw HTML",
    group: "layout",
    description: "Escape hatch for hand-written markup",
    defaultProps: {
      html: '<p style="margin:0;font-size:13px;">Custom markup</p>',
    },
    fields: [
      {
        key: "html",
        label: "HTML",
        type: "textarea",
        help: "Inserted verbatim - inline styles only, as email clients drop <style> rules.",
      },
    ],
    render: (props, { theme }) => (
      // Unstyled markup inherits the document's body copy rather than the
      // client default, which would be black text on a dark card.
      <div
        style={{
          fontFamily: theme.fontFamily,
          fontSize: theme.bodySize || "13px",
          lineHeight: theme.bodyLineHeight || "20px",
          color: theme.mutedForeground,
        }}
        dangerouslySetInnerHTML={{ __html: props.html ?? "" }}
      />
    ),
  },
};

export const BLOCK_LIST: BlockDefinition[] = Object.values(BLOCK_REGISTRY);

export function getBlockDefinition(type: BlockType): BlockDefinition {
  const def = BLOCK_REGISTRY[type];
  if (!def) throw new Error(`Unknown block type: ${type}`);
  return def;
}

/** Ids only need to be unique inside one document, not globally. */
export function createBlockId(type: BlockType | string = "block"): string {
  return `${type}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createBlock(
  type: BlockType,
  overrides: Record<string, any> = {},
): EmailBlock {
  const def = getBlockDefinition(type);
  return {
    id: createBlockId(type),
    type,
    props: structuredClone({ ...def.defaultProps, ...overrides }),
  };
}

/**
 * Missing props fall back to the block's defaults, so a document written by an
 * older editor version still renders after a block gains a field.
 */
export function renderBlock(
  block: EmailBlock,
  ctx: BlockRenderContext,
): React.ReactElement | null {
  const def = BLOCK_REGISTRY[block.type];
  if (!def) return null;
  return def.render({ ...def.defaultProps, ...block.props }, ctx);
}
