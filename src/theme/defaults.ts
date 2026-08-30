import type { EmailTheme } from "./types.js";

export const defaultLimonifyDarkTheme: EmailTheme = {
  name: "limonify-dark",
  primary: "#facc15", // limon yellow
  primaryForeground: "#18181b",
  background: "#09090b",
  surface: "#18181b",
  surfaceBorder: "#27272a",
  foreground: "#fafafa",
  muted: "#27272a",
  mutedForeground: "#a1a1aa",
  accent: "#27272a",
  accentForeground: "#fafafa",
  radius: "10px",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

export const defaultLimonifyLightTheme: EmailTheme = {
  name: "limonify-light",
  primary: "#ca8a04", // rich limon yellow
  primaryForeground: "#ffffff",
  background: "#f8fafc",
  surface: "#ffffff",
  surfaceBorder: "#e2e8f0",
  foreground: "#0f172a",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  accent: "#f8fafc",
  accentForeground: "#0f172a",
  radius: "10px",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};
