import fs from "node:fs";
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

export function parseCssTheme(
  cssContent: string,
  mode: "light" | "dark" = "dark",
): EmailTheme {
  const fallback =
    mode === "dark" ? defaultLimonifyDarkTheme : defaultLimonifyLightTheme;
  const vars = new Map<string, string>();

  // Capture target block: .dark vs :root / .light
  let targetBlock = cssContent;

  if (mode === "dark") {
    const darkMatch =
      cssContent.match(/\.dark\s*\{([^}]+)\}/) ||
      cssContent.match(/\[data-theme=["']dark["']\]\s*\{([^}]+)\}/);
    if (darkMatch && darkMatch[1]) {
      targetBlock = darkMatch[1];
    }
  } else {
    const rootMatch =
      cssContent.match(/:root\s*\{([^}]+)\}/) ||
      cssContent.match(/\.light\s*\{([^}]+)\}/) ||
      cssContent.match(/\[data-theme=["']light["']\]\s*\{([^}]+)\}/);
    if (rootMatch && rootMatch[1]) {
      targetBlock = rootMatch[1];
    }
  }

  // Regex to extract --var-name: value;
  const varRegex = /--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;

  while ((match = varRegex.exec(targetBlock)) !== null) {
    const key = match[1]?.trim();
    const val = match[2]?.trim();
    if (key && val) {
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

  const radius =
    vars.get("radius") || vars.get("border-radius") || fallback.radius;

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
    accent: toHex(["accent", "brand", "secondary"], fallback.accent),
    accentForeground: toHex(["accent-foreground"], fallback.accentForeground),
    radius:
      radius.includes("px") || radius.includes("rem") ? radius : `${radius}px`,
    fontFamily: vars.get("font-sans") || fallback.fontFamily,
    cardStyle: "double-frame",
  };
}

export function parseCssFile(
  filePath: string,
  mode: "light" | "dark" = "dark",
): EmailTheme {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSS file not found: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, "utf8");
  return parseCssTheme(content, mode);
}
