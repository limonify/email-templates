import type { EmailTheme } from "./types.js";

/**
 * Default themes are the resolved `@limonify/ui` design tokens
 * (`@limonify/ui/styles.css`), converted from OKLCH to sRGB by the same
 * parser that reads a project's own stylesheet - so rendering with no
 * `themeCssPath` configured produces the same palette as rendering with one.
 *
 * Token -> field mapping (see `parseCssTheme`):
 *   primary           <- --primary                secondary/accent pair is
 *   primaryForeground <- --primary-foreground     used for `accent`, because
 *   background        <- --background             the design system has no
 *   surface / muted   <- --background-muted       dedicated --accent token.
 *   surfaceBorder     <- --border
 *   foreground        <- --foreground-intense
 *   mutedForeground   <- --foreground-muted
 *   accent            <- --secondary
 *   accentForeground  <- --secondary-foreground
 *   radius            <- --radius (0.875rem, pinned to px for mail clients)
 *   fontFamily        <- --font-sans
 *
 * Keep these in sync with the stylesheet: rendering
 * `parseCssFile('<path>/@limonify/ui/styles.css', mode)` must reproduce them
 * field for field.
 */

export const defaultLimonifyDarkTheme: EmailTheme = {
  name: "limonify-dark",
  primary: "#ffffff",
  primaryForeground: "#101828",
  background: "#030712",
  surface: "#101828",
  surfaceBorder: "#1e2939",
  foreground: "#ffffff",
  muted: "#101828",
  mutedForeground: "#99a1af",
  accent: "#51a2ff",
  accentForeground: "#030712",
  radius: "14px",
  fontFamily:
    "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  cardStyle: "double-frame",
};

export const defaultLimonifyLightTheme: EmailTheme = {
  name: "limonify-light",
  primary: "#101828",
  primaryForeground: "#ffffff",
  background: "#ffffff",
  surface: "#f3f4f6",
  surfaceBorder: "#e5e7eb",
  foreground: "#101828",
  muted: "#f3f4f6",
  mutedForeground: "#6a7282",
  accent: "#8ec5ff",
  accentForeground: "#030712",
  radius: "14px",
  fontFamily:
    "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  cardStyle: "double-frame",
};
