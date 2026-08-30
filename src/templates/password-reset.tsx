import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
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
  badgeText = "Account Security",
  heading = "Reset Your Password",
  userName = "{{ .UserName }}",
  description,
  resetUrl = "{{ .ResetURL }}",
  buttonText = "Reset Password →",
  expiresIn = "{{ .ExpiresIn }}",
  securityNoticeTitle = "Security Notice",
  securityNoticeText,
  theme,
  ...layoutProps
}) => {
  const resolvedDescription =
    description ||
    `Hi ${userName}, we received a password reset request for your account. Click the button below to choose a new password:`;
  const resolvedNotice =
    securityNoticeText ||
    `This reset link will expire in ${expiresIn}. If you did not make this request, your account remains secure and you can safely ignore this email.`;

  return (
    <EmailLayout
      previewText="Reset your password"
      appName={appName}
      badgeText={badgeText}
      theme={theme}
      {...layoutProps}
    >
      {heading ? (
        <Heading
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: theme.foreground,
            margin: "0 0 10px",
            letterSpacing: "-0.025em",
          }}
        >
          {heading}
        </Heading>
      ) : null}

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

      <EmailButton href={resetUrl} theme={theme}>
        {buttonText}
      </EmailButton>

      <InfoCard title={securityNoticeTitle} theme={theme}>
        {resolvedNotice}
      </InfoCard>
    </EmailLayout>
  );
};
