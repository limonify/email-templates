import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { EmailBadge } from "../components/badge.js";
import type { EmailTheme } from "../theme/types.js";

export interface PaymentItemRow {
  label: string;
  value: string;
}

export interface PaymentCompletedEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  heading?: string;
  description?: string;
  userName?: string;
  orderId?: string;
  orderIdLabel?: string;
  date?: string;
  dateLabel?: string;
  planName?: string;
  planLabel?: string;
  paymentMethod?: string;
  paymentMethodLabel?: string;
  subtotal?: string;
  tax?: string;
  amount?: string;
  amountLabel?: string;
  receiptUrl?: string;
  buttonText?: string;
  customRows?: PaymentItemRow[];
}

export const PaymentCompletedEmail: React.FC<PaymentCompletedEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Payment Confirmed",
  heading = "Thank You for Your Order!",
  userName = "{{ .UserName }}",
  orderId = "{{ .OrderID }}",
  orderIdLabel = "Invoice ID",
  amount = "{{ .Amount }}",
  amountLabel = "Total Paid",
  subtotal,
  tax,
  paymentMethod = "Visa ending in 4242",
  paymentMethodLabel = "Payment Method",
  receiptUrl = "{{ .ReceiptURL }}",
  buttonText = "Download Invoice (PDF) →",
  planName = "{{ .PlanName }}",
  planLabel = "Plan / Subscription",
  date = "{{ .Date }}",
  dateLabel = "Billing Date",
  description,
  customRows,
  theme,
  ...layoutProps
}) => {
  const resolvedDescription =
    description ||
    `Hi ${userName}, your payment for ${planName} has been successfully processed. Here is your receipt summary:`;

  return (
    <EmailLayout
      previewText={`Payment Receipt (${orderId})`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="success" dot={true} theme={theme}>
        Payment Successful
      </EmailBadge>

      <Heading
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: theme.foreground,
          margin: "0 0 10px",
          letterSpacing: "-0.025em",
        }}
      >
        {heading}
      </Heading>
      <Text
        style={{
          fontSize: "14px",
          color: theme.mutedForeground,
          lineHeight: "22px",
          margin: "0 0 20px",
        }}
      >
        {resolvedDescription}
      </Text>

      {/* Limonify Receipt Card Frame Table */}
      <div
        style={{
          backgroundColor: theme.muted,
          borderRadius: `calc(${theme.radius} - 4px)`,
          border: `1px solid ${theme.surfaceBorder}`,
          padding: "18px 20px",
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
                {orderIdLabel}
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
                {dateLabel}
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
                {planLabel}
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
            <tr>
              <td
                style={{
                  padding: "6px 0",
                  fontSize: "13px",
                  color: theme.mutedForeground,
                }}
              >
                {paymentMethodLabel}
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
                {paymentMethod}
              </td>
            </tr>

            {subtotal ? (
              <tr>
                <td
                  style={{
                    padding: "6px 0",
                    fontSize: "13px",
                    color: theme.mutedForeground,
                  }}
                >
                  Subtotal
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    fontSize: "13px",
                    color: theme.foreground,
                    textAlign: "right",
                  }}
                >
                  {subtotal}
                </td>
              </tr>
            ) : null}

            {tax ? (
              <tr>
                <td
                  style={{
                    padding: "6px 0",
                    fontSize: "13px",
                    color: theme.mutedForeground,
                  }}
                >
                  Tax / VAT
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    fontSize: "13px",
                    color: theme.foreground,
                    textAlign: "right",
                  }}
                >
                  {tax}
                </td>
              </tr>
            ) : null}

            {customRows &&
              customRows.map((row, idx) => (
                <tr key={idx}>
                  <td
                    style={{
                      padding: "6px 0",
                      fontSize: "13px",
                      color: theme.mutedForeground,
                    }}
                  >
                    {row.label}
                  </td>
                  <td
                    style={{
                      padding: "6px 0",
                      fontSize: "13px",
                      color: theme.foreground,
                      textAlign: "right",
                    }}
                  >
                    {row.value}
                  </td>
                </tr>
              ))}

            <tr style={{ borderTop: `1px solid ${theme.surfaceBorder}` }}>
              <td
                style={{
                  padding: "12px 0 4px",
                  fontSize: "14px",
                  color: theme.foreground,
                  fontWeight: "700",
                }}
              >
                {amountLabel}
              </td>
              <td
                style={{
                  padding: "12px 0 4px",
                  fontSize: "18px",
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

      {receiptUrl ? (
        <EmailButton href={receiptUrl} theme={theme}>
          {buttonText}
        </EmailButton>
      ) : null}
    </EmailLayout>
  );
};
