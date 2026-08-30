import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { EmailBadge } from "../components/badge.js";
import { InfoCard } from "../components/info-card.js";
import type { EmailTheme } from "../theme/types.js";

export interface MagicLinkEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  heading?: string;
  description?: string;
  loginUrl?: string;
  buttonText?: string;
  expiresIn?: string;
  securityNoticeTitle?: string;
  securityNoticeText?: string;
}

export const MagicLinkEmail: React.FC<MagicLinkEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Instant Sign In",
  heading,
  description,
  loginUrl = "{{ .LoginURL }}",
  buttonText = "Sign In Instantly →",
  expiresIn = "{{ .ExpiresIn }}",
  securityNoticeTitle = "Security Notice",
  securityNoticeText,
  theme,
  ...layoutProps
}) => {
  const resolvedHeading = heading || `Sign In to ${appName}`;
  const resolvedDescription =
    description ||
    `Click the button below to securely sign in to your ${appName} account without entering a password:`;
  const resolvedNotice =
    securityNoticeText ||
    `This single-use magic link will expire in ${expiresIn}. If you did not request this email, you can safely ignore it.`;

  return (
    <EmailLayout
      previewText={`Your ${appName} sign-in link`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="accent" dot={true} theme={theme}>
        {badgeText}
      </EmailBadge>

      <Heading
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: theme.foreground,
          margin: "0 0 10px",
          letterSpacing: "-0.025em",
        }}
      >
        {resolvedHeading}
      </Heading>

      <Text
        style={{
          fontSize: "14px",
          color: theme.mutedForeground,
          lineHeight: "22px",
          margin: "0 0 16px",
        }}
      >
        {resolvedDescription}
      </Text>

      <EmailButton href={loginUrl} theme={theme}>
        {buttonText}
      </EmailButton>

      <InfoCard title={securityNoticeTitle} theme={theme}>
        {resolvedNotice}
      </InfoCard>
    </EmailLayout>
  );
};
