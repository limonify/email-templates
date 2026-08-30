import * as React from "react";
import { Heading, Text } from "@react-email/components";
import { EmailLayout } from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import type { EmailTheme } from "../theme/types.js";

export interface WelcomeEmailProps {
  appName?: string;
  userName?: string;
  dashboardUrl?: string;
  theme: EmailTheme;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  appName = "{{ .AppName }}",
  userName = "{{ .UserName }}",
  dashboardUrl = "{{ .DashboardURL }}",
  theme,
}) => {
  return (
    <EmailLayout
      previewText={`Welcome to ${appName}!`}
      appName={appName}
      theme={theme}
    >
      <Heading
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: theme.foreground,
          margin: "0 0 12px",
          letterSpacing: "-0.02em",
        }}
      >
        Welcome Aboard! 🎉
      </Heading>
      <Text
        style={{
          fontSize: "14px",
          color: theme.mutedForeground,
          lineHeight: "22px",
          margin: "0 0 16px",
        }}
      >
        Hi {userName}, we're excited to have you with us. Your {appName} account
        is ready and set up for you.
      </Text>

      <EmailButton href={dashboardUrl} theme={theme}>
        Go to Dashboard & Get Started
      </EmailButton>

      <Text
        style={{
          fontSize: "13px",
          color: theme.mutedForeground,
          lineHeight: "20px",
          margin: "20px 0 0",
        }}
      >
        If you have any questions, our support team is always here to help.
        Enjoy your experience!
      </Text>
    </EmailLayout>
  );
};
