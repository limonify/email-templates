import * as React from "react";
import { Heading, Text } from "@react-email/components";
import { EmailLayout } from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { InfoCard } from "../components/info-card.js";
import type { EmailTheme } from "../theme/types.js";

export interface NotificationEmailProps {
  appName?: string;
  userName?: string;
  title?: string;
  message?: string;
  actionUrl?: string;
  actionText?: string;
  theme: EmailTheme;
}

export const NotificationEmail: React.FC<NotificationEmailProps> = ({
  appName = "{{ .AppName }}",
  userName = "{{ .UserName }}",
  title = "{{ .Title }}",
  message = "{{ .Message }}",
  actionUrl = "{{ .ActionURL }}",
  actionText = "View Details",
  theme,
}) => {
  return (
    <EmailLayout previewText={title} appName={appName} theme={theme}>
      <Heading
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: theme.foreground,
          margin: "0 0 12px",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </Heading>
      <Text
        style={{
          fontSize: "14px",
          color: theme.mutedForeground,
          lineHeight: "22px",
          margin: "0 0 16px",
        }}
      >
        Hi {userName},
      </Text>

      <InfoCard theme={theme}>{message}</InfoCard>

      <EmailButton href={actionUrl} theme={theme}>
        {actionText}
      </EmailButton>
    </EmailLayout>
  );
};
