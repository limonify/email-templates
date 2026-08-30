import * as React from "react";
import { render } from "@react-email/render";
import type {
  EmailTheme,
  TemplateEngine,
  BrandingConfig,
} from "../theme/types.js";
import { adaptVariables } from "./adapters.js";
import { getTemplatePropsForLocale } from "../i18n/index.js";

import { OTPEmail } from "../templates/otp.js";
import { PasswordResetEmail } from "../templates/password-reset.js";
import { WelcomeEmail } from "../templates/welcome.js";
import { NotificationEmail } from "../templates/notification.js";
import { PaymentCompletedEmail } from "../templates/payment-completed.js";
import { MagicLinkEmail } from "../templates/magic-link.js";
import { TeamInviteEmail } from "../templates/team-invite.js";
import { SubscriptionCanceledEmail } from "../templates/subscription-canceled.js";
import { ApiKeyCreatedEmail } from "../templates/api-key-created.js";
import { UsageLimitWarningEmail } from "../templates/usage-limit-warning.js";
import { FeedbackRequestEmail } from "../templates/feedback-request.js";
import { ProductUpdateEmail } from "../templates/product-update.js";
import { PaymentFailedEmail } from "../templates/payment-failed.js";
import { TrialEndingEmail } from "../templates/trial-ending.js";
import { AccountDeletionEmail } from "../templates/account-deletion.js";
import { TwoFactorDisabledEmail } from "../templates/two-factor-disabled.js";
import { WeeklyDigestEmail } from "../templates/weekly-digest.js";
import { OrderShippedEmail } from "../templates/order-shipped.js";

export type TemplateId =
  | "otp"
  | "password-reset"
  | "welcome"
  | "notification"
  | "payment-completed"
  | "magic-link"
  | "team-invite"
  | "subscription-canceled"
  | "api-key-created"
  | "usage-limit-warning"
  | "feedback-request"
  | "product-update"
  | "payment-failed"
  | "trial-ending"
  | "account-deletion"
  | "two-factor-disabled"
  | "weekly-digest"
  | "order-shipped";

export interface TemplateMetadata {
  id: TemplateId;
  name: string;
  description: string;
  filename: string;
  component: (props: any) => React.ReactElement;
}

export const TEMPLATES_REGISTRY: Record<TemplateId, TemplateMetadata> = {
  otp: {
    id: "otp",
    name: "OTP / Verification Code",
    description: "Sign in and 2FA authentication code",
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
  "magic-link": {
    id: "magic-link",
    name: "Magic Link Sign In",
    description: "One-click passwordless login link",
    filename: "magic-link.html",
    component: (props) => React.createElement(MagicLinkEmail, props),
  },
  notification: {
    id: "notification",
    name: "Security Alert / Notification",
    description: "Session alert with device & IP details",
    filename: "notification.html",
    component: (props) => React.createElement(NotificationEmail, props),
  },
  "api-key-created": {
    id: "api-key-created",
    name: "API Key Created Alert",
    description: "New API token notice with prefix and revocation button",
    filename: "api-key-created.html",
    component: (props) => React.createElement(ApiKeyCreatedEmail, props),
  },
  "two-factor-disabled": {
    id: "two-factor-disabled",
    name: "2FA Disabled Alert",
    description: "Critical security alert when 2FA is removed from account",
    filename: "two-factor-disabled.html",
    component: (props) => React.createElement(TwoFactorDisabledEmail, props),
  },
  "payment-completed": {
    id: "payment-completed",
    name: "Payment Receipt / Invoice",
    description: "Itemized invoice summary with download action",
    filename: "payment-completed.html",
    component: (props) => React.createElement(PaymentCompletedEmail, props),
  },
  "payment-failed": {
    id: "payment-failed",
    name: "Payment Failed / Dunning",
    description: "Declined payment notice with card update action",
    filename: "payment-failed.html",
    component: (props) => React.createElement(PaymentFailedEmail, props),
  },
  "trial-ending": {
    id: "trial-ending",
    name: "Trial Ending Reminder",
    description: "Free trial expiration countdown and upgrade notice",
    filename: "trial-ending.html",
    component: (props) => React.createElement(TrialEndingEmail, props),
  },
  "team-invite": {
    id: "team-invite",
    name: "Team / Workspace Invitation",
    description: "Invite member to team or workspace with role assignment",
    filename: "team-invite.html",
    component: (props) => React.createElement(TeamInviteEmail, props),
  },
  "subscription-canceled": {
    id: "subscription-canceled",
    name: "Subscription Canceled",
    description: "Cancellation notice with access expiry date and reactivation",
    filename: "subscription-canceled.html",
    component: (props) => React.createElement(SubscriptionCanceledEmail, props),
  },
  "account-deletion": {
    id: "account-deletion",
    name: "Account Deletion Scheduled",
    description: "Grace period notice with cancellation button",
    filename: "account-deletion.html",
    component: (props) => React.createElement(AccountDeletionEmail, props),
  },
  welcome: {
    id: "welcome",
    name: "Welcome & Onboarding",
    description: "New account confirmation with setup checklist",
    filename: "welcome.html",
    component: (props) => React.createElement(WelcomeEmail, props),
  },
  "usage-limit-warning": {
    id: "usage-limit-warning",
    name: "Usage Quota Warning",
    description: "Monthly quota threshold alert with progress meter",
    filename: "usage-limit-warning.html",
    component: (props) => React.createElement(UsageLimitWarningEmail, props),
  },
  "weekly-digest": {
    id: "weekly-digest",
    name: "Weekly Analytics Digest",
    description: "7-day performance metrics and activity summary",
    filename: "weekly-digest.html",
    component: (props) => React.createElement(WeeklyDigestEmail, props),
  },
  "order-shipped": {
    id: "order-shipped",
    name: "Order Shipped / Tracking",
    description: "Delivery confirmation with tracking number and carrier",
    filename: "order-shipped.html",
    component: (props) => React.createElement(OrderShippedEmail, props),
  },
  "feedback-request": {
    id: "feedback-request",
    name: "Feedback / NPS Survey",
    description: "Customer satisfaction survey request with 1-click rating",
    filename: "feedback-request.html",
    component: (props) => React.createElement(FeedbackRequestEmail, props),
  },
  "product-update": {
    id: "product-update",
    name: "Product Update / Changelog",
    description: "Release announcement with feature tags and changelog link",
    filename: "product-update.html",
    component: (props) => React.createElement(ProductUpdateEmail, props),
  },
};

export async function renderTemplateToHtml(
  templateId: TemplateId,
  theme: EmailTheme,
  engine: TemplateEngine = "go",
  branding: BrandingConfig = {},
  customTemplateProps: Record<string, any> = {},
  locale: string = "en",
): Promise<string> {
  const meta = TEMPLATES_REGISTRY[templateId];
  if (!meta) {
    throw new Error(`Unknown template ID: ${templateId}`);
  }

  const localeProps = getTemplatePropsForLocale(templateId, locale);

  const mergedProps = {
    theme,
    ...localeProps,
    ...branding,
    ...customTemplateProps,
  };

  const rawHtml = await render(meta.component(mergedProps), { pretty: true });
  return adaptVariables(rawHtml, engine);
}
