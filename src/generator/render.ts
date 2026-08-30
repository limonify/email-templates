import * as React from "react";
import { render } from "@react-email/render";
import type { EmailTheme, TemplateEngine } from "../theme/types.js";
import { adaptVariables } from "./adapters.js";

import { OTPEmail } from "../templates/otp.js";
import { PasswordResetEmail } from "../templates/password-reset.js";
import { WelcomeEmail } from "../templates/welcome.js";
import { NotificationEmail } from "../templates/notification.js";
import { PaymentCompletedEmail } from "../templates/payment-completed.js";
import { MagicLinkEmail } from "../templates/magic-link.js";

export type TemplateId =
  | "otp"
  | "password-reset"
  | "welcome"
  | "notification"
  | "payment-completed"
  | "magic-link";

export interface BrandingConfig {
  appName?: string;
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
  supportUrl?: string;
}

export interface TemplateMetadata {
  id: TemplateId;
  name: string;
  description: string;
  filename: string;
  component: (
    props: { theme: EmailTheme } & BrandingConfig,
  ) => React.ReactElement;
}

export const TEMPLATES_REGISTRY: Record<TemplateId, TemplateMetadata> = {
  otp: {
    id: "otp",
    name: "OTP / Verification Code",
    description: "2FA and one-time verification code template",
    filename: "otp.html",
    component: (props) => React.createElement(OTPEmail, props),
  },
  "password-reset": {
    id: "password-reset",
    name: "Password Reset",
    description: "Password reset request with secure action button",
    filename: "password-reset.html",
    component: (props) => React.createElement(PasswordResetEmail, props),
  },
  welcome: {
    id: "welcome",
    name: "Welcome / Onboarding",
    description: "Welcome new users and guide them to getting started",
    filename: "welcome.html",
    component: (props) => React.createElement(WelcomeEmail, props),
  },
  notification: {
    id: "notification",
    name: "Account Notification / Alert",
    description: "General system announcements, security alerts, and updates",
    filename: "notification.html",
    component: (props) => React.createElement(NotificationEmail, props),
  },
  "payment-completed": {
    id: "payment-completed",
    name: "Payment Completed & Invoice Receipt",
    description: "Order summary, item breakdown, and invoice download link",
    filename: "payment-completed.html",
    component: (props) => React.createElement(PaymentCompletedEmail, props),
  },
  "magic-link": {
    id: "magic-link",
    name: "Magic Link / Passwordless Login",
    description: "One-click passwordless authentication link",
    filename: "magic-link.html",
    component: (props) => React.createElement(MagicLinkEmail, props),
  },
};

export async function renderTemplateToHtml(
  templateId: TemplateId,
  theme: EmailTheme,
  engine: TemplateEngine = "go",
  branding: BrandingConfig = {},
): Promise<string> {
  const meta = TEMPLATES_REGISTRY[templateId];
  if (!meta) {
    throw new Error(`Unknown template ID: ${templateId}`);
  }

  const rawHtml = await render(meta.component({ theme, ...branding }), {
    pretty: true,
  });
  return adaptVariables(rawHtml, engine);
}
