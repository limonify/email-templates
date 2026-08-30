export interface EmailTheme {
  name?: string;
  primary: string;
  primaryForeground: string;
  background: string;
  surface: string;
  surfaceBorder: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  radius: string;
  fontFamily: string;
}

export type TemplateEngine = "go" | "handlebars" | "raw";
