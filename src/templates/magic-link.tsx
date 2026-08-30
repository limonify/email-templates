import * as React from "react";
import { Heading, Text } from "@react-email/components";
import { EmailLayout } from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { InfoCard } from "../components/info-card.js";
import type { EmailTheme } from "../theme/types.js";

export interface MagicLinkEmailProps {
  appName?: string;
  loginUrl?: string;
  expiresIn?: string;
  theme: EmailTheme;
}

export const MagicLinkEmail: React.FC<MagicLinkEmailProps> = ({
  appName = "{{ .AppName }}",
  loginUrl = "{{ .LoginURL }}",
  expiresIn = "{{ .ExpiresIn }}",
  theme,
}) => {
  return (
    <EmailLayout
      previewText={`Your ${appName} sign-in link`}
      appName={appName}
      badgeText="Instant Sign In"
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
        Sign In to {appName}
      </Heading>
      <Text
        style={{
          fontSize: "14px",
          color: theme.mutedForeground,
          lineHeight: "22px",
          margin: "0 0 16px",
        }}
      >
        Click the button below to securely sign in to your {appName} account
        without entering a password:
      </Text>

      <EmailButton href={loginUrl} theme={theme}>
        Sign In Instantly →
      </EmailButton>

      <InfoCard title="Security Notice" theme={theme}>
        This single-use magic link will expire in <strong>{expiresIn}</strong>.
        If you did not request this email, you can safely ignore it.
      </InfoCard>
    </EmailLayout>
  );
};
