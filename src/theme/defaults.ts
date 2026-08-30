import type { EmailTheme } from "./types.js";

export const defaultLimonifyDarkTheme: EmailTheme = {
  name: "limonify-dark",
  primary: "#ffffff",
  primaryForeground: "#090d16",
  background: "#070a11",
  surface: "#0e1422",
  surfaceBorder: "#1c263c",
  foreground: "#f8fafc",
  muted: "#131b2e",
  mutedForeground: "#94a3b8",
  accent: "#facc15", // limon brand yellow
  accentForeground: "#090d16",
  radius: "14px",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

export const defaultLimonifyLightTheme: EmailTheme = {
  name: "limonify-light",
  primary: "#0f172a",
  primaryForeground: "#ffffff",
  background: "#f8fafc",
  surface: "#ffffff",
  surfaceBorder: "#e2e8f0",
  foreground: "#0f172a",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  accent: "#eab308", // limon brand yellow
  accentForeground: "#ffffff",
  radius: "14px",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};
