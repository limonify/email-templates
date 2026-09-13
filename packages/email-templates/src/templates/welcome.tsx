import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { EmailBadge } from "../components/badge.js";
import { StepsList, type StepItem } from "../components/steps-list.js";
import type { EmailTheme } from "../theme/types.js";

export interface WelcomeEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  heading?: string;
  description?: string;
  footerText?: string;
  userName?: string;
  dashboardUrl?: string;
  buttonText?: string;
  steps?: StepItem[];
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Welcome",
  heading,
  description,
  footerText = "Let us know if you have any questions along the way.",
  userName = "{{ .UserName }}",
  dashboardUrl = "{{ .DashboardURL }}",
  buttonText = "Go to dashboard",
  steps,
  theme,
  ...layoutProps
}) => {
  const resolvedHeading = heading || `Welcome to ${appName}`;
  const resolvedDescription =
    description || `Hi ${userName}, your account is set up and ready to use.`;

  const defaultSteps: StepItem[] = [
    {
      number: 1,
      title: "Email confirmed",
      description: "Your primary email address is verified.",
      completed: true,
    },
    {
      number: 2,
      title: "Workspace setup",
      description: "Configure your team and default workspace preferences.",
      completed: false,
    },
  ];

  const resolvedSteps = steps || defaultSteps;

  return (
    <EmailLayout
      previewText={`Welcome to ${appName}`}
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

      <StepsList steps={resolvedSteps} theme={theme} />

      <EmailButton href={dashboardUrl} theme={theme}>
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
