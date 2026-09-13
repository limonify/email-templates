import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { EmailBadge } from "../components/badge.js";
import { InfoCard } from "../components/info-card.js";
import {
  DeviceSessionCard,
  type DeviceSessionProps,
} from "../components/device-session-card.js";
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
  sessionDetails?: DeviceSessionProps;
}

export const NotificationEmail: React.FC<NotificationEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Security notice",
  userName = "{{ .UserName }}",
  title = "{{ .Title }}",
  message = "{{ .Message }}",
  actionUrl = "{{ .ActionURL }}",
  actionText = "Review activity",
  sessionDetails,
  heading,
  greeting,
  theme,
  ...layoutProps
}) => {
  const resolvedHeading = heading || title;

  return (
    <EmailLayout
      previewText={title}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="warning" dot={true} theme={theme}>
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
        {resolvedHeading}
      </Heading>

      <InfoCard theme={theme}>{message}</InfoCard>

      {sessionDetails ? (
        <DeviceSessionCard {...sessionDetails} theme={theme} />
      ) : null}

      {actionUrl ? (
        <EmailButton href={actionUrl} theme={theme}>
          {actionText}
        </EmailButton>
      ) : null}
    </EmailLayout>
  );
};
