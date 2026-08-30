import * as React from "react";
import { Heading, Text } from "@react-email/components";
import { EmailLayout } from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import type { EmailTheme } from "../theme/types.js";

export interface PaymentCompletedEmailProps {
  appName?: string;
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
  supportUrl?: string;
  userName?: string;
  orderId?: string;
  amount?: string;
  receiptUrl?: string;
  planName?: string;
  date?: string;
  theme: EmailTheme;
}

export const PaymentCompletedEmail: React.FC<PaymentCompletedEmailProps> = ({
  appName = "{{ .AppName }}",
  logoUrl,
  logoWidth,
  logoHeight,
  supportUrl,
  userName = "{{ .UserName }}",
  orderId = "{{ .OrderID }}",
  amount = "{{ .Amount }}",
  receiptUrl = "{{ .ReceiptURL }}",
  planName = "{{ .PlanName }}",
  date = "{{ .Date }}",
  theme,
}) => {
  return (
    <EmailLayout
      previewText={`Payment Receipt (${orderId})`}
      appName={appName}
      logoUrl={logoUrl}
      logoWidth={logoWidth}
      logoHeight={logoHeight}
      supportUrl={supportUrl}
      badgeText="Payment Confirmed"
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
        Thank You for Your Order!
      </Heading>
      <Text
        style={{
          fontSize: "14px",
          color: theme.mutedForeground,
          lineHeight: "22px",
          margin: "0 0 20px",
        }}
      >
        Hi {userName}, your payment for <strong>{planName}</strong> has been
        successfully processed. Here is your receipt summary:
      </Text>

      {/* Limonify Card Frame Table */}
      <div
        style={{
          backgroundColor: theme.muted,
          borderRadius: `calc(${theme.radius} - 4px)`,
          border: `1px solid ${theme.surfaceBorder}`,
          padding: "16px 20px",
          margin: "16px 0 24px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td
                style={{
                  padding: "6px 0",
                  fontSize: "13px",
                  color: theme.mutedForeground,
                }}
              >
                Order ID
              </td>
              <td
                style={{
                  padding: "6px 0",
                  fontSize: "13px",
                  color: theme.foreground,
                  textAlign: "right",
                  fontWeight: "600",
                  fontFamily: "monospace",
                }}
              >
                {orderId}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "6px 0",
                  fontSize: "13px",
                  color: theme.mutedForeground,
                }}
              >
                Date
              </td>
              <td
                style={{
                  padding: "6px 0",
                  fontSize: "13px",
                  color: theme.foreground,
                  textAlign: "right",
                }}
              >
                {date}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "6px 0",
                  fontSize: "13px",
                  color: theme.mutedForeground,
                }}
              >
                Plan / Subscription
              </td>
              <td
                style={{
                  padding: "6px 0",
                  fontSize: "13px",
                  color: theme.foreground,
                  textAlign: "right",
                  fontWeight: "500",
                }}
              >
                {planName}
              </td>
            </tr>
            <tr style={{ borderTop: `1px solid ${theme.surfaceBorder}` }}>
              <td
                style={{
                  padding: "12px 0 4px",
                  fontSize: "14px",
                  color: theme.foreground,
                  fontWeight: "700",
                }}
              >
                Total Paid
              </td>
              <td
                style={{
                  padding: "12px 0 4px",
                  fontSize: "17px",
                  color: theme.accent,
                  textAlign: "right",
                  fontWeight: "800",
                }}
              >
                {amount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={receiptUrl} theme={theme}>
        Download Official Invoice →
      </EmailButton>
    </EmailLayout>
  );
};
