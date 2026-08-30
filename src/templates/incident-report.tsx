import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { EmailBadge } from "../components/badge.js";
import type { EmailTheme } from "../theme/types.js";

export interface IncidentReportEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  incidentTitle?: string;
  status?: string;
  statusLabel?: string;
  affectedServices?: string;
  affectedLabel?: string;
  statusUrl?: string;
  buttonText?: string;
  description?: string;
}

export const IncidentReportEmail: React.FC<IncidentReportEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Service alert",
  incidentTitle = "Investigating elevated API error rates",
  status = "Investigating",
  statusLabel = "Current status",
  affectedServices = "API Gateway, Webhooks (EU Region)",
  affectedLabel = "Impacted systems",
  statusUrl = "https://status.limonify.com",
  buttonText = "View live status page",
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
    `Our engineering team is actively investigating an operational incident affecting ${appName} infrastructure.`;

  return (
    <EmailLayout
      previewText={`Status Alert: ${incidentTitle}`}
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
        {incidentTitle}
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

      {/* Incident Status Box */}
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
                {statusLabel}
              </td>
              <td
                style={{
                  padding: "4px 0",
                  fontSize: "12px",
                  color: "#facc15",
                  textAlign: "right",
                  fontWeight: "600",
                }}
              >
                {status}
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
                {affectedLabel}
              </td>
              <td
                style={{
                  padding: "4px 0",
                  fontSize: "12px",
                  color: theme.foreground,
                  textAlign: "right",
                  fontWeight: "500",
                }}
              >
                {affectedServices}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={statusUrl} theme={theme}>
        {buttonText}
      </EmailButton>
    </EmailLayout>
  );
};
