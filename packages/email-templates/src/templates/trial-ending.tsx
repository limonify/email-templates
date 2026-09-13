import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { EmailBadge } from "../components/badge.js";
import type { EmailTheme } from "../theme/types.js";

export interface TrialEndingEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  heading?: string;
  description?: string;
  planName?: string;
  daysLeft?: string;
  daysLeftLabel?: string;
  expiryDate?: string;
  expiryDateLabel?: string;
  upgradeUrl?: string;
  buttonText?: string;
}

export const TrialEndingEmail: React.FC<TrialEndingEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Trial ending",
  heading = "Your trial ends soon",
  planName = "{{ .PlanName }}",
  daysLeft = "3",
  daysLeftLabel = "Time remaining",
  expiryDate = "{{ .ExpiryDate }}",
  expiryDateLabel = "Trial ends on",
  upgradeUrl = "{{ .UpgradeURL }}",
  buttonText = "Upgrade to Pro",
  description,
  theme,
  ...layoutProps
}) => {
  const isDark =
    theme.background === "#0a0a0a" || theme.background.startsWith("#0");
  const cardBg = isDark ? "#111111" : "#f9f9fb";
  const cardBorder = isDark ? "#222222" : "#ebebeb";

  const resolvedDescription =
    description ||
    `Your free trial for ${appName} ${planName} will expire in ${daysLeft} days. Upgrade now to keep uninterrupted access to all workspace features.`;

  return (
    <EmailLayout
      previewText={`Your ${appName} trial expires in ${daysLeft} days`}
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
        {heading}
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

      {/* Trial summary card */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: "8px",
          border: `1px solid ${cardBorder}`,
          padding: "14px 16px",
          margin: "16px 0 20px",
          fontFamily: theme.fontFamily,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td
                style={{
                  padding: "4px 0",
                  fontSize: "12px",
                  color: theme.mutedForeground,
                }}
              >
                {daysLeftLabel}
              </td>
              <td
                style={{
                  padding: "4px 0",
                  fontSize: "12px",
                  color: theme.foreground,
                  textAlign: "right",
                  fontWeight: "600",
                }}
              >
                {daysLeft} days
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "4px 0",
                  fontSize: "12px",
                  color: theme.mutedForeground,
                }}
              >
                {expiryDateLabel}
              </td>
              <td
                style={{
                  padding: "4px 0",
                  fontSize: "12px",
                  color: theme.foreground,
                  textAlign: "right",
                }}
              >
                {expiryDate}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={upgradeUrl} theme={theme}>
        {buttonText}
      </EmailButton>
    </EmailLayout>
  );
};
