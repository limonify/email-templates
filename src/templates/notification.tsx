import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { InfoCard } from "../components/info-card.js";
import type { EmailTheme } from "../theme/types.js";

export interface NotificationEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  heading?: string;
  greeting?: string;
  userName?: string;
  title?: string;
  message?: string;
  actionUrl?: string;
  actionText?: string;
}

export const NotificationEmail: React.FC<NotificationEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "System Notification",
  userName = "{{ .UserName }}",
  title = "{{ .Title }}",
  message = "{{ .Message }}",
  actionUrl = "{{ .ActionURL }}",
  actionText = "View Update →",
  heading,
  greeting,
  theme,
  ...layoutProps
}) => {
  const resolvedHeading = heading || title;
  const resolvedGreeting = greeting || `Hi ${userName},`;

  return (
    <EmailLayout
      previewText={title}
      appName={appName}
      badgeText={badgeText}
      theme={theme}
      {...layoutProps}
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
        {resolvedGreeting}
      </Text>

      <InfoCard theme={theme}>{message}</InfoCard>

      {actionUrl ? (
        <EmailButton href={actionUrl} theme={theme}>
          {actionText}
        </EmailButton>
      ) : null}
    </EmailLayout>
  );
};
