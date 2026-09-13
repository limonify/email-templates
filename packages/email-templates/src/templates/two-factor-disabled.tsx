import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { EmailBadge } from "../components/badge.js";
import {
  DeviceSessionCard,
  type DeviceSessionProps,
} from "../components/device-session-card.js";
import { InfoCard } from "../components/info-card.js";
import type { EmailTheme } from "../theme/types.js";

export interface TwoFactorDisabledEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  heading?: string;
  description?: string;
  secureAccountUrl?: string;
  actionText?: string;
  securityWarning?: string;
  sessionDetails?: DeviceSessionProps;
}

export const TwoFactorDisabledEmail: React.FC<TwoFactorDisabledEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Critical security",
  heading = "Two-factor authentication disabled",
  description,
  secureAccountUrl = "{{ .SecureAccountURL }}",
  actionText = "Secure account & re-enable 2FA",
  securityWarning,
  sessionDetails,
  theme,
  ...layoutProps
}) => {
  const resolvedDescription =
    description ||
    `Two-Factor Authentication (2FA) was recently disabled on your ${appName} account. If you did not make this change, your credentials may be compromised.`;
  const resolvedWarning =
    securityWarning ||
    "Disabling two-factor authentication leaves your workspace vulnerable to unauthorized access. We strongly recommend keeping 2FA enabled.";

  return (
    <EmailLayout
      previewText={`Security alert: 2FA disabled on ${appName}`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="error" dot={true} theme={theme}>
        {badgeText}
      </EmailBadge>

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

      <Text
        style={{
          fontSize: "13px",
          color: theme.mutedForeground,
          lineHeight: "20px",
          margin: "0 0 16px",
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedDescription}
      </Text>

      {sessionDetails ? (
        <DeviceSessionCard {...sessionDetails} theme={theme} />
      ) : null}

      <EmailButton href={secureAccountUrl} theme={theme}>
        {actionText}
      </EmailButton>

      <InfoCard title="Security recommendation" theme={theme}>
        {resolvedWarning}
      </InfoCard>
    </EmailLayout>
  );
};
