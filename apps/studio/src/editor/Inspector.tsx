import * as React from "react";
import {
  getBlockDefinition,
  parseCssTheme,
  type EmailTheme,
  type FieldDefinition,
} from "@limonify/email-templates/web";
import {
  Button,
  Field,
  Select,
  SectionLabel,
  Switch,
  TextArea,
  TextInput,
  ToggleGroup,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  removeBlock,
  renameDocument,
  replaceTheme,
  setEngine,
  setMode,
  updateBlockProps,
  updateBranding,
  updateMeta,
  updateTheme,
  useEditor,
} from "@/editor/store";

type Tab = "block" | "theme" | "branding" | "settings";

const TABS: Array<{ id: Tab; label: string }> = [
  { id: "block", label: "Block" },
  { id: "theme", label: "Theme" },
  { id: "branding", label: "Brand" },
  { id: "settings", label: "Doc" },
];

export function Inspector() {
  const [tab, setTab] = React.useState<Tab>("block");
  const selectedId = useEditor((state) => state.selectedId);

  // Selecting a block on the canvas should show its settings immediately.
  React.useEffect(() => {
    if (selectedId) setTab("block");
  }, [selectedId]);

  return (
    <aside className="flex w-[300px] shrink-0 flex-col border-l border-chrome-700 bg-chrome-900">
      <div className="flex gap-0.5 border-b border-chrome-700 p-2">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "flex-1 cursor-pointer rounded-md px-2 py-1.5 text-[11px] font-semibold transition-colors",
              tab === item.id
                ? "bg-chrome-700 text-white"
                : "text-chrome-300 hover:text-chrome-50",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {tab === "block" ? <BlockPanel /> : null}
        {tab === "theme" ? <ThemePanel /> : null}
        {tab === "branding" ? <BrandingPanel /> : null}
        {tab === "settings" ? <SettingsPanel /> : null}
      </div>
    </aside>
  );
}

function BlockPanel() {
  const selectedId = useEditor((state) => state.selectedId);
  const block = useEditor((state) =>
    state.doc.blocks.find((item) => item.id === state.selectedId),
  );

  if (!block || !selectedId) {
    return (
      <p className="text-xs leading-5 text-chrome-400">
        Select a block on the canvas to edit it, or drag a new one in from the
        left.
      </p>
    );
  }

  const definition = getBlockDefinition(block.type);
  const props = { ...definition.defaultProps, ...block.props };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold">{definition.label}</span>
        <Button variant="danger" onClick={() => removeBlock(block.id)}>
          Delete
        </Button>
      </div>

      {definition.fields.length === 0 ? (
        <p className="text-xs text-chrome-400">
          This block has no options - it follows the document theme.
        </p>
      ) : (
        definition.fields.map((field) => (
          <FieldControl
            key={field.key}
            field={field}
            value={props[field.key]}
            onChange={(value) =>
              updateBlockProps(block.id, { [field.key]: value })
            }
          />
        ))
      )}
    </div>
  );
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: FieldDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  switch (field.type) {
    case "textarea":
      return (
        <Field label={field.label} help={field.help}>
          <TextArea
            value={String(value ?? "")}
            placeholder={field.placeholder}
            onChange={(event) => onChange(event.target.value)}
          />
        </Field>
      );
    case "select":
      return (
        <Field label={field.label} help={field.help}>
          <Select
            className="w-full"
            value={String(value ?? "")}
            onChange={(event) => onChange(event.target.value)}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      );
    case "boolean":
      return (
        <div className="flex items-center justify-between py-1">
          <span className="text-[11px] font-medium text-chrome-300">
            {field.label}
          </span>
          <Switch checked={Boolean(value)} onChange={onChange} />
        </div>
      );
    case "number":
      return (
        <Field label={field.label} help={field.help}>
          <TextInput
            type="number"
            value={value === undefined ? "" : String(value)}
            onChange={(event) => onChange(Number(event.target.value))}
          />
        </Field>
      );
    case "list":
      return (
        <ListField
          field={field}
          items={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      );
    default:
      return (
        <Field label={field.label} help={field.help}>
          <TextInput
            value={String(value ?? "")}
            placeholder={field.placeholder}
            onChange={(event) => onChange(event.target.value)}
          />
        </Field>
      );
  }
}

function ListField({
  field,
  items,
  onChange,
}: {
  field: FieldDefinition;
  items: Array<Record<string, unknown>>;
  onChange: (value: unknown) => void;
}) {
  function update(index: number, patch: Record<string, unknown>) {
    onChange(
      items.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  }

  function move(index: number, delta: number) {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item!);
    onChange(next);
  }

  return (
    <div className="space-y-2">
      <SectionLabel>{field.label}</SectionLabel>
      {items.map((item, index) => (
        <div
          key={index}
          className="space-y-2 rounded-lg border border-chrome-700 bg-chrome-850 p-2.5"
        >
          <div className="flex items-center justify-between">
            <span className="truncate text-[11px] font-semibold text-chrome-50">
              {String(
                item[field.itemLabelKey ?? "label"] ?? `Item ${index + 1}`,
              )}
            </span>
            <div className="flex items-center gap-0.5">
              <Button
                className="px-1.5 py-0.5"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                title="Move up"
              >
                ↑
              </Button>
              <Button
                className="px-1.5 py-0.5"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                title="Move down"
              >
                ↓
              </Button>
              <Button
                className="px-1.5 py-0.5"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                title="Remove"
              >
                ✕
              </Button>
            </div>
          </div>
          {field.itemFields?.map((itemField) => (
            <FieldControl
              key={itemField.key}
              field={itemField}
              value={item[itemField.key]}
              onChange={(value) => update(index, { [itemField.key]: value })}
            />
          ))}
        </div>
      ))}
      <Button
        variant="outline"
        className="w-full justify-center"
        onClick={() =>
          onChange([...items, structuredClone(field.defaultItem ?? {})])
        }
      >
        Add {field.label.replace(/s$/, "").toLowerCase()}
      </Button>
    </div>
  );
}

const THEME_COLORS: Array<{ key: keyof EmailTheme; label: string }> = [
  { key: "background", label: "Background" },
  { key: "foreground", label: "Foreground" },
  { key: "mutedForeground", label: "Muted text" },
  { key: "surface", label: "Surface" },
  { key: "surfaceBorder", label: "Border" },
  { key: "primary", label: "Primary" },
  { key: "primaryForeground", label: "Primary text" },
  { key: "accent", label: "Accent" },
];

function ThemePanel() {
  const doc = useEditor((state) => state.doc);
  const [css, setCss] = React.useState("");
  const [cssError, setCssError] = React.useState<string | null>(null);

  function applyCss() {
    try {
      const parsed = parseCssTheme(css, doc.mode);
      replaceTheme({ ...parsed, cardStyle: doc.theme.cardStyle });
      setCssError(null);
    } catch (err) {
      setCssError((err as Error).message);
    }
  }

  return (
    <div className="space-y-3">
      <Field label="Color mode">
        <ToggleGroup
          value={doc.mode}
          onChange={setMode}
          options={[
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
          ]}
        />
      </Field>

      <Field label="Card style">
        <Select
          className="w-full"
          value={doc.theme.cardStyle ?? "double-frame"}
          onChange={(event) =>
            updateTheme({ cardStyle: event.target.value as never })
          }
        >
          <option value="double-frame">Double-frame card</option>
          <option value="single">Single card</option>
          <option value="minimal">Minimal / flat</option>
        </Select>
      </Field>

      <Field label="Container width">
        <TextInput
          value={doc.theme.containerWidth ?? ""}
          placeholder="520px"
          onChange={(event) =>
            updateTheme({ containerWidth: event.target.value })
          }
        />
      </Field>

      <Field label="Corner radius">
        <TextInput
          value={doc.theme.radius ?? ""}
          placeholder="9px"
          onChange={(event) => updateTheme({ radius: event.target.value })}
        />
      </Field>

      <Field label="Font family">
        <TextInput
          value={doc.theme.fontFamily ?? ""}
          placeholder="'Plus Jakarta Sans', sans-serif"
          onChange={(event) => updateTheme({ fontFamily: event.target.value })}
        />
      </Field>

      <SectionLabel>Colors</SectionLabel>
      {THEME_COLORS.map((color) => (
        <ColorField
          key={color.key}
          label={color.label}
          value={(doc.theme[color.key] as string) ?? ""}
          onChange={(value) => updateTheme({ [color.key]: value })}
        />
      ))}

      <SectionLabel>Import from CSS</SectionLabel>
      <TextArea
        value={css}
        rows={5}
        placeholder=":root { --primary: oklch(0.7 0.19 47); ... }"
        onChange={(event) => setCss(event.target.value)}
      />
      <p className="text-[10px] leading-4 text-chrome-400">
        Paste a Tailwind / design-system stylesheet to pull <code>:root</code>{" "}
        and <code>.dark</code> tokens into this document.
      </p>
      {cssError ? <p className="text-[10px] text-red-400">{cssError}</p> : null}
      <Button
        variant="outline"
        className="w-full justify-center"
        disabled={!css.trim()}
        onClick={applyCss}
      >
        Apply stylesheet
      </Button>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const isHex = /^#[0-9a-f]{6}$/i.test(value);
  return (
    <Field label={label}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={isHex ? value : "#000000"}
          onChange={(event) => onChange(event.target.value)}
          className="h-7 w-9 cursor-pointer rounded border border-chrome-700 bg-chrome-850"
        />
        <TextInput
          value={value}
          placeholder="inherits default"
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </Field>
  );
}

function BrandingPanel() {
  const branding = useEditor((state) => state.doc.branding);

  return (
    <div className="space-y-3">
      <Field label="App name">
        <TextInput
          value={branding.appName ?? ""}
          onChange={(event) => updateBranding({ appName: event.target.value })}
        />
      </Field>
      <Field label="Logo URL">
        <TextInput
          value={branding.logoUrl ?? ""}
          onChange={(event) => updateBranding({ logoUrl: event.target.value })}
        />
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Logo width">
          <TextInput
            type="number"
            value={String(branding.logoWidth ?? "")}
            onChange={(event) =>
              updateBranding({ logoWidth: Number(event.target.value) })
            }
          />
        </Field>
        <Field label="Logo height">
          <TextInput
            type="number"
            value={String(branding.logoHeight ?? "")}
            onChange={(event) =>
              updateBranding({ logoHeight: Number(event.target.value) })
            }
          />
        </Field>
      </div>
      <div className="flex items-center justify-between py-1">
        <span className="text-[11px] font-medium text-chrome-300">
          Show brand name
        </span>
        <Switch
          checked={branding.showBrandName !== false}
          onChange={(checked) => updateBranding({ showBrandName: checked })}
        />
      </div>

      <SectionLabel>Footer</SectionLabel>
      <Field label="Support text">
        <TextInput
          value={branding.supportText ?? ""}
          onChange={(event) =>
            updateBranding({ supportText: event.target.value })
          }
        />
      </Field>
      <Field label="Support URL">
        <TextInput
          value={branding.supportUrl ?? ""}
          onChange={(event) =>
            updateBranding({ supportUrl: event.target.value })
          }
        />
      </Field>
      <Field label="Company address">
        <TextInput
          value={branding.companyAddress ?? ""}
          onChange={(event) =>
            updateBranding({ companyAddress: event.target.value })
          }
        />
      </Field>
      <Field label="Copyright">
        <TextInput
          value={branding.copyrightText ?? ""}
          placeholder="© 2026 Limonify. All rights reserved."
          onChange={(event) =>
            updateBranding({ copyrightText: event.target.value })
          }
        />
      </Field>
    </div>
  );
}

function SettingsPanel() {
  const doc = useEditor((state) => state.doc);
  const engine = useEditor((state) => state.engine);

  return (
    <div className="space-y-3">
      <Field label="Template name">
        <TextInput
          value={doc.name}
          onChange={(event) => renameDocument(event.target.value)}
        />
      </Field>
      <Field label="Subject line">
        <TextInput
          value={doc.meta.subject ?? ""}
          onChange={(event) => updateMeta({ subject: event.target.value })}
        />
      </Field>
      <Field
        label="Preview text"
        help="The grey line mail clients show next to the subject."
      >
        <TextInput
          value={doc.meta.previewText ?? ""}
          onChange={(event) => updateMeta({ previewText: event.target.value })}
        />
      </Field>
      <Field
        label="Export engine"
        help="Applies to exported HTML; placeholders are rewritten to match."
      >
        <Select
          className="w-full"
          value={engine}
          onChange={(event) => setEngine(event.target.value as never)}
        >
          <option value="go">Go — {"{{ .Var }}"}</option>
          <option value="handlebars">Handlebars — {"{{ var }}"}</option>
          <option value="raw">Raw — __VAR__</option>
        </Select>
      </Field>

      <SectionLabel>Document</SectionLabel>
      <dl className="space-y-1 text-[11px] text-chrome-400">
        <div className="flex justify-between">
          <dt>Blocks</dt>
          <dd className="text-chrome-50">{doc.blocks.length}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Last saved</dt>
          <dd className="text-chrome-50">
            {doc.updatedAt ? new Date(doc.updatedAt).toLocaleTimeString() : "—"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
