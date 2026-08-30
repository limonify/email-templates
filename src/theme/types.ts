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
  outputDir?: string;
  branding?: BrandingConfig;
  templates?: {
    otp?: Partial<import("../templates/otp.js").OTPEmailProps>;
    passwordReset?: Partial<
      import("../templates/password-reset.js").PasswordResetEmailProps
    >;
    welcome?: Partial<import("../templates/welcome.js").WelcomeEmailProps>;
    notification?: Partial<
      import("../templates/notification.js").NotificationEmailProps
    >;
    paymentCompleted?: Partial<
      import("../templates/payment-completed.js").PaymentCompletedEmailProps
    >;
    magicLink?: Partial<
      import("../templates/magic-link.js").MagicLinkEmailProps
    >;
  };
}
