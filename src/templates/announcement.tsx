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

export interface AnnouncementEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  subject?: string;
  heading?: string;
  description?: string;
  userName?: string;
  message?: string;
  actionUrl?: string;
  buttonText?: string;
  noticeTitle?: string;
  noticeText?: string;
}

export const AnnouncementEmail: React.FC<AnnouncementEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Announcement",
  subject = "{{ .Subject }}",
  userName = "{{ .UserName }}",
  message = "We are introducing significant upgrades to our infrastructure, offering 2x faster load times and enhanced enterprise security protocols.",
  actionUrl = "{{ .ActionURL }}",
  buttonText = "Learn more",
  noticeTitle,
  noticeText,
  heading,
  description,
  theme,
  ...layoutProps
}) => {
  const resolvedHeading = heading || `Important Update: ${subject}`;
  const resolvedDescription =
    description ||
    `Hi ${userName}, we have an important announcement regarding ${appName}:`;

  return (
    <EmailLayout
      previewText={resolvedHeading}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="neutral" theme={theme}>
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

      <Text
        style={{
          fontSize: "13px",
          color: theme.foreground,
          lineHeight: "22px",
          margin: "0 0 16px",
          fontFamily: theme.fontFamily,
        }}
      >
        {message}
      </Text>

      {noticeText ? (
        <InfoCard title={noticeTitle} theme={theme}>
          {noticeText}
        </InfoCard>
      ) : null}

      {actionUrl ? (
        <EmailButton href={actionUrl} theme={theme}>
          {buttonText}
        </EmailButton>
      ) : null}
    </EmailLayout>
  );
};
