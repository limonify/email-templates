import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { EmailBadge } from "../components/badge.js";
import type { EmailTheme } from "../theme/types.js";

export interface FeedbackRequestEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  heading?: string;
  description?: string;
  userName?: string;
  surveyUrl?: string;
  buttonText?: string;
  footerText?: string;
}

export const FeedbackRequestEmail: React.FC<FeedbackRequestEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Feedback",
  heading = "How has your experience been?",
  userName = "{{ .UserName }}",
  surveyUrl = "{{ .SurveyURL }}",
  buttonText = "Share feedback (2 mins)",
  footerText = "Your feedback directly shapes our product roadmap. Thank you for your time.",
  description,
  theme,
  ...layoutProps
}) => {
  const resolvedDescription =
    description ||
    `Hi ${userName}, we would love to hear your thoughts on your experience with ${appName} so far.`;

  return (
    <EmailLayout
      previewText={`Quick question about ${appName}`}
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
        {heading}
      </Heading>

      <Text
        style={{
          fontSize: "13px",
          color: theme.mutedForeground,
          lineHeight: "20px",
          margin: "0 0 20px",
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedDescription}
      </Text>

      <EmailButton href={surveyUrl} theme={theme}>
        {buttonText}
      </EmailButton>

      {footerText ? (
        <Text
          style={{
            fontSize: "12px",
            color: theme.mutedForeground,
            lineHeight: "18px",
            margin: "16px 0 0",
            fontFamily: theme.fontFamily,
          }}
        >
          {footerText}
        </Text>
      ) : null}
    </EmailLayout>
  );
};
