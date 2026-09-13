import type { EmailTheme } from "./types.js";

/**
 * Surface rules shared by every block, kept in one place so a new block cannot
 * drift from the design system.
 *
 * The values mirror `@limonify/ui`: cards sit on `background-subtle` with a
 * `border-muted` hairline, meters and tag chips use `background-strong` as
 * their track, and a frame around a card is `--card-radius * 4/3` (the same
 * ratio the UI's `Card` uses for its outer frame).
 */
export function isDarkTheme(theme: EmailTheme): boolean {
  return theme.background === "#0a0a0a" || theme.background.startsWith("#0");
}

/** The nested card inside the email card - one step up from the page surface. */
export function nestedSurface(theme: EmailTheme): {
  bg: string;
  border: string;
} {
  return isDarkTheme(theme)
    ? { bg: "#111111", border: "#222222" }
    : { bg: "#f9f9fb", border: "#ebebeb" };
}

/** Meter tracks, tag chips, avatar placeholders - `background-strong`. */
export function strongSurface(theme: EmailTheme): string {
  return isDarkTheme(theme) ? "#262626" : "#e4e4e7";
}

/** Readable text on top of {@link strongSurface}. */
export function strongSurfaceForeground(theme: EmailTheme): string {
  return isDarkTheme(theme) ? "#d4d4d4" : "#52525b";
}

/** Semantic accents, matching the badge component's palette. */
export function toneColor(
  theme: EmailTheme,
  tone: "accent" | "success" | "warning" | "error",
): string {
  const dark = isDarkTheme(theme);
  switch (tone) {
    case "success":
      return "#22c55e";
    case "warning":
      return dark ? "#facc15" : "#ca8a04";
    case "error":
      return dark ? "#f87171" : "#dc2626";
    default:
      return theme.accent;
  }
}

/**
 * A frame wrapped around a card is one radius step larger, so the inner and
 * outer curves stay concentric.
 */
export function frameRadius(radius: string | undefined): string {
  const px = Number.parseFloat(radius ?? "9");
  return Number.isFinite(px) ? `${Math.round((px * 4) / 3)}px` : "12px";
}
