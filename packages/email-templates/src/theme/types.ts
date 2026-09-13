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
  cardStyle?: "double-frame" | "single" | "minimal";

  // Sizing & Typography Overrides
  containerWidth?: string;
  cardPadding?: string;
  headingSize?: string;
  headingWeight?: string | number;
  headingLetterSpacing?: string;
  bodySize?: string;
  bodyLineHeight?: string;
  buttonFontSize?: string;
  buttonPadding?: string;
  buttonRadius?: string;
  badgeFontSize?: string;
  badgePadding?: string;
}

export type TemplateEngine = "go" | "handlebars" | "raw" | "custom";

export interface SocialLink {
  platform: "github" | "twitter" | "discord" | "linkedin" | "website";
  url: string;
}

export interface BrandingConfig {
  appName?: string;
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoRadius?: number | string;
  brandNameSize?: string;
  brandNameWeight?: string | number;
  showBrandName?: boolean;
  supportUrl?: string;
  supportText?: string;
  unsubscribeUrl?: string;
  companyAddress?: string;
  copyrightText?: string;
  socialLinks?: SocialLink[];
}

export interface LimonifyEmailConfig {
  theme?: Partial<EmailTheme>;
  themeCssPath?: string;
  mode?: "light" | "dark";
  engine?: TemplateEngine;
  locales?: string[];
  localesDir?: string;
  translations?: Record<
    string,
    import("../i18n/types.js").DeepPartial<
      import("../i18n/types.js").EmailLocaleDictionary
    >
  >;
  outputDir?: string;
  branding?: BrandingConfig;
  templates?: Record<string, Record<string, any>>;
}
