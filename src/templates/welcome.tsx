import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
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
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Welcome Aboard",
  heading,
  description,
  footerText = "Explore our components, start customizing your themes, and let us know if you need any help along the way!",
  userName = "{{ .UserName }}",
  dashboardUrl = "{{ .DashboardURL }}",
  buttonText = "Go to Dashboard →",
  theme,
  ...layoutProps
}) => {
  const resolvedHeading = heading || `Welcome to ${appName}! ✨`;
  const resolvedDescription =
    description ||
    `Hi ${userName}, we're thrilled to have you with us. Your account is activated and ready to build modern experiences.`;

  return (
    <EmailLayout
      previewText={`Welcome to ${appName}!`}
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
        {resolvedDescription}
      </Text>

      <EmailButton href={dashboardUrl} theme={theme}>
        {buttonText}
      </EmailButton>

      {footerText ? (
        <Text
          style={{
            fontSize: "13px",
            color: theme.mutedForeground,
            lineHeight: "20px",
            margin: "20px 0 0",
          }}
        >
          {footerText}
        </Text>
      ) : null}
    </EmailLayout>
  );
};
