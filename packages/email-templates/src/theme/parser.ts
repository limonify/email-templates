import fs from "node:fs";
import path from "node:path";
import { colord } from "colord";
import type { EmailTheme } from "./types.js";
import {
  defaultLimonifyDarkTheme,
  defaultLimonifyLightTheme,
} from "./defaults.js";

export function oklchToHex(l: number, c: number, h: number): string {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const rLin = +4.0767434772 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const gLin = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const bLin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  const transfer = (cLin: number) => {
    const clamped = Math.max(0, Math.min(1, cLin));
    return clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };

  const r = Math.round(transfer(rLin) * 255);
  const g = Math.round(transfer(gLin) * 255);
  const bVal = Math.round(transfer(bLin) * 255);

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${bVal.toString(16).padStart(2, "0")}`;
}

export function parseCssColorToHex(str: string): string | null {
  if (!str) return null;
  const cleaned = str.replace(/var\([^)]+\)/g, "").trim() || str;

  // 1. Try OKLCH format: oklch(43.9% 0 0) or oklch(0.439 0.02 250 / 10%)
  const oklchMatch = cleaned.match(
    /oklch\(\s*([\d.]+)%?\s+([\d.]+)%?\s+([\d.]+)%?(?:\s*\/\s*[\d.]+%?)?\s*\)/i,
  );
  if (oklchMatch) {
    let l = parseFloat(oklchMatch[1]);
    if (l > 1) l = l / 100;
    const c = parseFloat(oklchMatch[2]);
    const h = parseFloat(oklchMatch[3]) || 0;
    return oklchToHex(l, c, h);
  }

  // 2. Try Standard colord (HEX, RGB, HSL, Named colors)
  const color = colord(cleaned);
  if (color.isValid()) {
    return color.toHex();
  }

  return null;
}

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function isBaseSelector(selector: string): boolean {
  return (
    selector === ":root" ||
    selector === ".light" ||
    /^\[data-theme=["']?light["']?\]$/.test(selector)
  );
}

function isDarkSelector(selector: string): boolean {
  return (
    selector === ".dark" || /^\[data-theme=["']?dark["']?\]$/.test(selector)
  );
}

/**
 * Collect `--var: value` declarations from every rule whose selector list is
 * accepted. Selectors are matched exactly, so a compiled Tailwind rule like
 * `.dark\:bg-red:is(.dark *)` never passes for `.dark`.
 */
function collectVars(
  css: string,
  accept: (selectors: string[]) => boolean,
): Map<string, string> {
  const vars = new Map<string, string>();
  // `[^{}]*` cannot cross a brace, so group 1 is always the text between the
  // previous brace and this one - i.e. the selector of a leaf rule.
  const blockRegex = /([^{}]*)\{([^{}]*)\}/g;
  let block: RegExpExecArray | null;

  while ((block = blockRegex.exec(css)) !== null) {
    const selectors = (block[1] ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!accept(selectors)) continue;

    // The trailing `;` is optional - minified stylesheets drop it on the
    // last declaration of a block.
    const varRegex = /--([a-zA-Z0-9_-]+)\s*:\s*([^;]+)(?:;|$)/g;
    let decl: RegExpExecArray | null;
    while ((decl = varRegex.exec(block[2] ?? "")) !== null) {
      const key = decl[1]?.trim();
      // Values may wrap across lines (e.g. a long --font-sans stack).
      const val = decl[2]?.replace(/\s+/g, " ").trim();
      if (key && val) {
        vars.set(key, val);
      }
    }
  }

  return vars;
}

/**
 * Normalise a CSS length for inline email styles. rem is unreliable across
 * mail clients, so it is pinned to px at the 16px root default.
 */
function toEmailLength(value: string, fallbackValue: string): string {
  const trimmed = value.trim();

  const rem = trimmed.match(/^([\d.]+)rem$/i);
  if (rem?.[1]) return `${Math.round(parseFloat(rem[1]) * 16)}px`;
  if (/^[\d.]+px$/i.test(trimmed)) return trimmed;
  if (/^[\d.]+$/.test(trimmed)) return `${trimmed}px`;

  // calc(), clamp(), var() chains and friends cannot be resolved statically.
  return fallbackValue;
}

export function parseCssTheme(
  cssContent: string,
  mode: "light" | "dark" = "dark",
): EmailTheme {
  const fallback =
    mode === "dark" ? defaultLimonifyDarkTheme : defaultLimonifyLightTheme;

  // Comments first: a stylesheet header that documents an override with
  // `:root { --color-primary: ... }` would otherwise be read as the real
  // token block, and every token would silently fall back.
  const css = stripComments(cssContent);

  // `:root` / `.light` carries the full token set; `.dark` only redefines what
  // differs. Dark mode is therefore the base with the dark block layered over
  // it - reading `.dark` alone drops root-only tokens like --radius.
  const vars = collectVars(css, (selectors) => selectors.some(isBaseSelector));
  if (mode === "dark") {
    const darkVars = collectVars(css, (selectors) =>
      selectors.some(isDarkSelector),
    );
    for (const [key, val] of darkVars) {
      vars.set(key, val);
    }
  }

  // Helper to resolve CSS variables into valid HEX
  const toHex = (keys: string[], defaultHex: string): string => {
    for (const key of keys) {
      const val = vars.get(key);
      if (val) {
        const hex = parseCssColorToHex(val);
        if (hex) return hex;
      }
    }
    return defaultHex;
  };

  const radius = vars.get("radius") || vars.get("border-radius");
  const fontSans = vars.get("font-sans");

  return {
    name: `limonify-${mode}`,
    primary: toHex(["primary", "brand", "accent-color"], fallback.primary),
    primaryForeground: toHex(
      ["primary-foreground", "brand-foreground"],
      fallback.primaryForeground,
    ),
    background: toHex(
      ["background", "bg", "background-subtle"],
      fallback.background,
    ),
    surface: toHex(
      ["card", "surface", "background-muted", "background-subtle", "popover"],
      fallback.surface,
    ),
    surfaceBorder: toHex(
      ["border", "card-border", "border-strong"],
      fallback.surfaceBorder,
    ),
    foreground: toHex(
      ["foreground-intense", "foreground", "foreground-strong", "text"],
      fallback.foreground,
    ),
    muted: toHex(["background-muted", "muted", "secondary"], fallback.muted),
    mutedForeground: toHex(
      [
        "foreground-muted",
        "muted-foreground",
        "foreground-subtle",
        "text-muted",
      ],
      fallback.mutedForeground,
    ),
    // `accent` is rendered as a foreground (the code in CodeBox, the
    // GradientGlow stroke), so it resolves to the `-emphasis` tier - the one
    // the design system itself uses for coloured text. The plain `-secondary`
    // tier is a fill meant to sit *under* text and is far too light to read
    // against a muted background.
    accent: toHex(
      ["accent", "brand", "secondary-emphasis", "secondary"],
      fallback.accent,
    ),
    accentForeground: toHex(
      ["accent-foreground", "secondary-foreground"],
      fallback.accentForeground,
    ),
    radius: radius ? toEmailLength(radius, fallback.radius) : fallback.radius,
    // Compiled stylesheets quote family names with `"`, which would be
    // escaped to `&quot;` inside an inline style attribute - normalise to `'`.
    // A bare `var(...)` is an unresolvable self-reference, not a stack.
    fontFamily:
      fontSans && !fontSans.startsWith("var(")
        ? fontSans.replace(/"/g, "'")
        : fallback.fontFamily,
    cardStyle: "double-frame",
  };
}

const MAX_IMPORT_DEPTH = 16;

function resolveImportPath(spec: string, fromDir: string): string | null {
  const candidates: string[] = [];

  if (spec.startsWith(".") || path.isAbsolute(spec)) {
    candidates.push(path.resolve(fromDir, spec));
  } else {
    // Bare specifier such as `@limonify/ui/styles.css` - walk node_modules up
    // from the importing file, the way a bundler would.
    let dir = fromDir;
    for (;;) {
      candidates.push(path.join(dir, "node_modules", spec));
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }

  for (const candidate of candidates) {
    try {
      if (fs.statSync(candidate).isFile()) return candidate;
    } catch {
      // Not here - try the next candidate.
    }
  }
  return null;
}

/**
 * Inline `@import`ed stylesheets in place so the cascade resolves.
 *
 * A design system is normally consumed as `@import '@limonify/ui/styles.css'`
 * followed by project overrides, so reading only the entry file would miss
 * every token the package defines - `--radius` and `--font-sans` among them -
 * and silently fall back for each.
 */
function flattenCss(filePath: string, seen: Set<string>, depth = 0): string {
  const resolved = path.resolve(filePath);
  if (depth > MAX_IMPORT_DEPTH || seen.has(resolved)) return "";
  seen.add(resolved);

  const dir = path.dirname(resolved);
  // Strip comments before rewriting imports, so a commented-out `@import`
  // is not followed.
  const source = stripComments(fs.readFileSync(resolved, "utf8"));

  return source.replace(
    /@import\s+(?:url\()?["']([^"')]+)["']\)?[^;]*;/g,
    (_statement, spec: string) => {
      const target = resolveImportPath(spec, dir);
      // An unresolvable specifier (`tailwindcss`) is dropped, not fatal.
      return target ? flattenCss(target, seen, depth + 1) : "";
    },
  );
}

export function parseCssFile(
  filePath: string,
  mode: "light" | "dark" = "dark",
): EmailTheme {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSS file not found: ${filePath}`);
  }
  return parseCssTheme(flattenCss(filePath, new Set()), mode);
}
