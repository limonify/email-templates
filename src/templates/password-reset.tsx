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

export interface PasswordResetEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  heading?: string;
  description?: string;
  userName?: string;
  resetUrl?: string;
  buttonText?: string;
  expiresIn?: string;
  securityNoticeTitle?: string;
  securityNoticeText?: string;
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Security",
  heading = "Reset your password",
  userName = "{{ .UserName }}",
  description,
  resetUrl = "{{ .ResetURL }}",
  buttonText = "Reset password",
  expiresIn = "{{ .ExpiresIn }}",
  securityNoticeTitle = "Security note",
  securityNoticeText,
  theme,
  ...layoutProps
}) => {
  const resolvedDescription =
    description ||
    `We received a request to reset the password for your account. Click the button below to proceed:`;
  const resolvedNotice =
    securityNoticeText ||
    `This link will expire in ${expiresIn}. If you didn't request a password reset, no action is required.`;

  return (
    <EmailLayout
      previewText="Reset your password"
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="warning" dot={true} theme={theme}>
        {badgeText}
      </EmailBadge>

      {heading ? (
        <Heading
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: theme.foreground,
            margin: "0 0 8px",
            letterSpacing: "-0.025em",
            fontFamily: theme.fontFamily,
          }}
        >
          {heading}
        </Heading>
      ) : null}

      <Text
        style={{
          fontSize: "13px",
          color: theme.mutedForeground,
          lineHeight: "20px",
          margin: "0 0 12px",
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedDescription}
      </Text>

      <EmailButton href={resetUrl} theme={theme}>
        {buttonText}
      </EmailButton>

      <InfoCard title={securityNoticeTitle} theme={theme}>
        {resolvedNotice}
      </InfoCard>
    </EmailLayout>
  );
};
