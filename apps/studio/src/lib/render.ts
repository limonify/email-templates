import {
  defaultLimonifyDarkTheme,
  defaultLimonifyLightTheme,
  type EmailTheme,
} from "@limonify/email-templates/web";

export type ColorMode = "dark" | "light";
export type CardStyle = "double-frame" | "single" | "minimal";
export type Viewport = "desktop" | "mobile";

export const VIEWPORT_WIDTH: Record<Viewport, number> = {
  desktop: 520,
  mobile: 375,
};

export function baseTheme(mode: ColorMode): EmailTheme {
  return mode === "light"
    ? defaultLimonifyLightTheme
    : defaultLimonifyDarkTheme;
}

export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

export function downloadFile(
  filename: string,
  content: string,
  type = "text/html;charset=utf-8",
) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function pickFile(accept: string): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = () => resolve(input.files?.[0] ?? null);
    input.click();
  });
}

export function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "template"
  );
}
