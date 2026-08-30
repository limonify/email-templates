import * as React from "react";
import { Heading, Text } from "@react-email/components";
import { EmailLayout } from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { InfoCard } from "../components/info-card.js";
import type { EmailTheme } from "../theme/types.js";

export interface PasswordResetEmailProps {
  appName?: string;
  userName?: string;
  resetUrl?: string;
  expiresIn?: string;
  theme: EmailTheme;
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
  appName = "{{ .AppName }}",
  userName = "{{ .UserName }}",
  resetUrl = "{{ .ResetURL }}",
  expiresIn = "{{ .ExpiresIn }}",
  theme,
}) => {
  return (
    <EmailLayout
      previewText="Reset your password"
      appName={appName}
      badgeText="Account Security"
      theme={theme}
    >
      <Heading
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: theme.foreground,
          margin: "0 0 10px",
          letterSpacing: "-0.025em",
        }}
      >
        Reset Your Password
      </Heading>
      <Text
        style={{
          fontSize: "14px",
          color: theme.mutedForeground,
          lineHeight: "22px",
          margin: "0 0 16px",
        }}
      >
        Hi {userName}, we received a password reset request for your account.
        Click the button below to choose a new password:
      </Text>

      <EmailButton href={resetUrl} theme={theme}>
        Reset Password →
      </EmailButton>

      <InfoCard title="Security Notice" theme={theme}>
        This reset link will expire in <strong>{expiresIn}</strong>. If you did
        not make this request, your account remains secure and you can safely
        ignore this email.
      </InfoCard>
    </EmailLayout>
  );
};
