import * as React from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  LOCALES_REGISTRY,
  TEMPLATES_REGISTRY,
  TEMPLATE_GROUPS,
  renderTemplateToHtml,
  type SupportedLocale,
  type TemplateId,
} from "@limonify/email-templates/web";
import { Button, Select, ToggleGroup } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  VIEWPORT_WIDTH,
  baseTheme,
  copyToClipboard,
  downloadFile,
  type CardStyle,
  type ColorMode,
  type Viewport,
} from "@/lib/render";
import { sampleProps } from "@/preview/sample-data";

const BRANDING = {
  appName: "Limonify",
  logoUrl:
    "https://raw.githubusercontent.com/limonify/email-templates/main/.github/assets/logo.png",
  logoWidth: 26,
  logoHeight: 26,
};

/** Presets that the editor can open as a starting document. */
const EDITABLE_PRESETS: Partial<Record<TemplateId, string>> = {
  otp: "otp",
  welcome: "welcome",
  announcement: "announcement",
  notification: "security-alert",
};

const templates = Object.values(TEMPLATES_REGISTRY);

export function PreviewRoute() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/preview" });

  const activeId = (search.template as TemplateId) || "otp";
  const active = TEMPLATES_REGISTRY[activeId] ?? TEMPLATES_REGISTRY.otp;

  const [locale, setLocale] = React.useState<SupportedLocale>("en");
  const [mode, setMode] = React.useState<ColorMode>("dark");
  const [cardStyle, setCardStyle] = React.useState<CardStyle>("double-frame");
  const [engine, setEngine] = React.useState<"go" | "handlebars" | "raw">("go");
  const [useSample, setUseSample] = React.useState(true);
  const [viewport, setViewport] = React.useState<Viewport>("desktop");
  const [html, setHtml] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    const theme = { ...baseTheme(mode), cardStyle };

    renderTemplateToHtml(
      active.id,
      theme,
      engine,
      BRANDING,
      useSample ? sampleProps(locale) : {},
      locale,
    )
      .then((result) => {
        if (cancelled) return;
        setHtml(result);
        setError(null);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, [active.id, mode, cardStyle, engine, useSample, locale]);

  async function handleCopy() {
    await copyToClipboard(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex h-full">
      <aside className="flex w-[290px] shrink-0 flex-col border-r border-chrome-700 bg-chrome-900">
        <div className="flex items-center justify-between border-b border-chrome-700 px-4 py-3">
          <span className="text-xs font-semibold">Templates</span>
          <span className="rounded border border-chrome-600 bg-chrome-800 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-chrome-300">
            {templates.length}
          </span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {TEMPLATE_GROUPS.map((group) => {
            const items = templates.filter((t) => t.group === group.id);
            if (!items.length) return null;
            return (
              <div key={group.id} className="mb-2">
                <div className="px-2 pt-2 pb-1 text-[10px] font-semibold tracking-[0.08em] text-chrome-400 uppercase">
                  {group.label} ({items.length})
                </div>
                {items.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() =>
                      navigate({
                        to: "/preview",
                        search: { template: template.id },
                      })
                    }
                    className={cn(
                      "mb-1 block w-full cursor-pointer rounded-lg border border-transparent px-2.5 py-2 text-left transition-colors",
                      template.id === active.id
                        ? "bg-white text-chrome-950"
                        : "text-chrome-300 hover:bg-chrome-800 hover:text-chrome-50",
                    )}
                  >
                    <span className="block text-xs font-semibold">
                      {template.name}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block text-[11px] leading-4",
                        template.id === active.id
                          ? "text-chrome-400"
                          : "text-chrome-400",
                      )}
                    >
                      {template.description}
                    </span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-chrome-700 bg-chrome-900 px-4">
          <span className="text-sm font-semibold tracking-tight">
            {active.name}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={locale}
              onChange={(e) => setLocale(e.target.value as SupportedLocale)}
            >
              {Object.entries(LOCALES_REGISTRY).map(([code, meta]) => (
                <option key={code} value={code}>
                  {meta.flag} {meta.name}
                </option>
              ))}
            </Select>

            <ToggleGroup<ColorMode>
              value={mode}
              onChange={setMode}
              options={[
                { value: "dark", label: "Dark" },
                { value: "light", label: "Light" },
              ]}
            />

            <Select
              value={cardStyle}
              onChange={(e) => setCardStyle(e.target.value as CardStyle)}
            >
              <option value="double-frame">Double-frame card</option>
              <option value="single">Single card</option>
              <option value="minimal">Minimal / flat</option>
            </Select>

            <Select
              value={useSample ? "sample" : "vars"}
              onChange={(e) => setUseSample(e.target.value === "sample")}
            >
              <option value="sample">Sample data</option>
              <option value="vars">Backend variables</option>
            </Select>

            <Select
              value={engine}
              onChange={(e) => setEngine(e.target.value as typeof engine)}
            >
              <option value="go">Go — {"{{ .Var }}"}</option>
              <option value="handlebars">Handlebars — {"{{ var }}"}</option>
              <option value="raw">Raw — __VAR__</option>
            </Select>

            <ToggleGroup<Viewport>
              value={viewport}
              onChange={setViewport}
              options={[
                { value: "desktop", label: "Desktop" },
                { value: "mobile", label: "Mobile" },
              ]}
            />

            {EDITABLE_PRESETS[active.id] ? (
              <Button
                variant="outline"
                onClick={() =>
                  navigate({
                    to: "/editor",
                    search: { preset: EDITABLE_PRESETS[active.id] },
                  })
                }
              >
                Open in editor
              </Button>
            ) : null}

            <Button
              variant="ghost"
              onClick={() => downloadFile(active.filename, html)}
            >
              Download
            </Button>
            <Button variant="primary" onClick={handleCopy} disabled={!html}>
              {copied ? "Copied" : "Copy HTML"}
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 justify-center overflow-auto p-6">
          {error ? (
            <div className="m-auto max-w-lg rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300">
              {error}
            </div>
          ) : (
            <iframe
              title={active.name}
              srcDoc={html}
              className="h-full rounded-xl border border-chrome-700 bg-black shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] transition-[width] duration-200"
              style={{ width: VIEWPORT_WIDTH[viewport] }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
