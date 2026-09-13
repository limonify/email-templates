import type { EmailTheme } from "./types.js";

/**
 * Default themes are the resolved limonify palette, produced by the same
 * parser that reads a project's own stylesheet - so rendering with no
 * `themeCssPath` configured matches rendering with one.
 *
 * The source is the app-level cascade, not the package defaults on their own:
 * `@limonify/ui/styles.css` supplies the full token set (--radius,
 * --font-sans, the status families) and the app stylesheet then overrides the
 * neutrals to a chromaless grey scale and `--secondary` to violet. Reading
 * only the package would give the blue-tinted greys the apps do not ship.
 *
 * Token -> field mapping (see `parseCssTheme`):
 *   primary           <- --primary
 *   primaryForeground <- --primary-foreground
 *   background        <- --background
 *   surface / muted   <- --background-muted
 *   surfaceBorder     <- --border
 *   foreground        <- --foreground-intense
 *   mutedForeground   <- --foreground-muted
 *   accent            <- --secondary-emphasis (rendered as text)
 *   accentForeground  <- --secondary-foreground
 *   radius            <- --radius (0.875rem, pinned to px for mail clients)
 *   fontFamily        <- --font-sans
 *
 * Keep these in sync with the stylesheet: `parseCssFile(<app styles.css>,
 * mode)` must reproduce them field for field.
 */

export const defaultLimonifyDarkTheme: EmailTheme = {
  name: "limonify-dark",
  primary: "#ffffff",
  primaryForeground: "#171717",
  background: "#0a0a0a",
  surface: "#171717",
  surfaceBorder: "#262626",
  foreground: "#ffffff",
  muted: "#171717",
  mutedForeground: "#a1a1a1",
  accent: "#8e51ff",
  accentForeground: "#0a0a0a",
  radius: "14px",
  fontFamily:
    "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  cardStyle: "double-frame",
};

export const defaultLimonifyLightTheme: EmailTheme = {
  name: "limonify-light",
  primary: "#171717",
  primaryForeground: "#ffffff",
  background: "#ffffff",
  surface: "#f5f5f5",
  surfaceBorder: "#e5e5e5",
  foreground: "#171717",
  muted: "#f5f5f5",
  mutedForeground: "#737373",
  accent: "#8e51ff",
  accentForeground: "#0a0a0a",
  radius: "14px",
  fontFamily:
    "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  cardStyle: "double-frame",
};
