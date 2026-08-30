import type { EmailTheme } from "./types.js";

export const defaultLimonifyDarkTheme: EmailTheme = {
  name: "limonify-dark",
  primary: "#ffffff",
  primaryForeground: "#0a0a0a",
  background: "#0a0a0a",
  surface: "#171717",
  surfaceBorder: "#262626",
  foreground: "#f8fafc",
  muted: "#262626",
  mutedForeground: "#a3a3a3",
  accent: "#facc15",
  accentForeground: "#0a0a0a",
  radius: "14px",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  cardStyle: "double-frame",
};

export const defaultLimonifyLightTheme: EmailTheme = {
  name: "limonify-light",
  primary: "#171717",
  primaryForeground: "#ffffff",
  background: "#fafafa",
  surface: "#ffffff",
  surfaceBorder: "#e5e5e5",
  foreground: "#171717",
  muted: "#f5f5f5",
  mutedForeground: "#737373",
  accent: "#eab308",
  accentForeground: "#ffffff",
  radius: "14px",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  cardStyle: "double-frame",
};
