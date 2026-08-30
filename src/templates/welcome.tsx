import * as React from "react";
import { Heading, Text } from "@react-email/components";
import { EmailLayout } from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import type { EmailTheme } from "../theme/types.js";

export interface WelcomeEmailProps {
  appName?: string;
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
  supportUrl?: string;
  userName?: string;
  dashboardUrl?: string;
  theme: EmailTheme;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  appName = "{{ .AppName }}",
  logoUrl,
  logoWidth,
  logoHeight,
  supportUrl,
  userName = "{{ .UserName }}",
  dashboardUrl = "{{ .DashboardURL }}",
  theme,
}) => {
  return (
    <EmailLayout
      previewText={`Welcome to ${appName}!`}
      appName={appName}
      logoUrl={logoUrl}
      logoWidth={logoWidth}
      logoHeight={logoHeight}
      supportUrl={supportUrl}
      badgeText="Welcome Aboard"
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
        Welcome to {appName}! ✨
      </Heading>
      <Text
        style={{
          fontSize: "14px",
          color: theme.mutedForeground,
          lineHeight: "22px",
          margin: "0 0 16px",
        }}
      >
        Hi {userName}, we're thrilled to have you with us. Your account is
        activated and ready to build modern experiences.
      </Text>

      <EmailButton href={dashboardUrl} theme={theme}>
        Go to Dashboard →
      </EmailButton>

      <Text
        style={{
          fontSize: "13px",
          color: theme.mutedForeground,
          lineHeight: "20px",
          margin: "20px 0 0",
        }}
      >
        Explore our components, start customizing your themes, and let us know
        if you need any help along the way!
      </Text>
    </EmailLayout>
  );
};
