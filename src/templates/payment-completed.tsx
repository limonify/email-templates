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
  badgeText = "Paid",
  heading = "Payment receipt",
  userName = "{{ .UserName }}",
  orderId = "{{ .OrderID }}",
  orderIdLabel = "Invoice",
  amount = "{{ .Amount }}",
  amountLabel = "Total paid",
  subtotal,
  tax,
  paymentMethod = "Visa •••• 4242",
  paymentMethodLabel = "Payment method",
  receiptUrl = "{{ .ReceiptURL }}",
  buttonText = "Download invoice (PDF)",
  planName = "{{ .PlanName }}",
  planLabel = "Item",
  date = "{{ .Date }}",
  dateLabel = "Date",
  description,
  customRows,
  theme,
  ...layoutProps
}) => {
  const isDark =
    theme.background === "#0a0a0a" || theme.background.startsWith("#0");
  const tableBg = isDark ? "#111111" : "#f9f9fb";
  const tableBorder = isDark ? "#222222" : "#ebebeb";
  const rowBorder = isDark ? "#1a1a1a" : "#f0f0f0";

  const resolvedDescription =
    description ||
    `Your payment for ${planName} has been processed successfully.`;

  return (
    <EmailLayout
      previewText={`Payment receipt for ${orderId}`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="success" dot={true} theme={theme}>
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
          margin: "0 0 18px",
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedDescription}
      </Text>

      {/* Limonify Table Style Data Grid */}
      <div
        style={{
          backgroundColor: tableBg,
          borderRadius: "8px",
          border: `1px solid ${tableBorder}`,
          padding: "14px 16px",
          margin: "16px 0 20px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: theme.fontFamily,
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "5px 0",
                  fontSize: "12px",
                  color: theme.mutedForeground,
                }}
              >
                {orderIdLabel}
              </td>
              <td
                style={{
                  padding: "5px 0",
                  fontSize: "12px",
                  color: theme.foreground,
                  textAlign: "right",
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                {orderId}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "5px 0",
                  fontSize: "12px",
                  color: theme.mutedForeground,
                }}
              >
                {dateLabel}
              </td>
              <td
                style={{
                  padding: "5px 0",
                  fontSize: "12px",
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
                  padding: "5px 0",
                  fontSize: "12px",
                  color: theme.mutedForeground,
                }}
              >
                {planLabel}
              </td>
              <td
                style={{
                  padding: "5px 0",
                  fontSize: "12px",
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
                  padding: "5px 0",
                  fontSize: "12px",
                  color: theme.mutedForeground,
                }}
              >
                {paymentMethodLabel}
              </td>
              <td
                style={{
                  padding: "5px 0",
                  fontSize: "12px",
                  color: theme.foreground,
                  textAlign: "right",
                }}
              >
                {paymentMethod}
              </td>
            </tr>

            {subtotal ? (
              <tr>
                <td
                  style={{
                    padding: "5px 0",
                    fontSize: "12px",
                    color: theme.mutedForeground,
                  }}
                >
                  Subtotal
                </td>
                <td
                  style={{
                    padding: "5px 0",
                    fontSize: "12px",
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
                    padding: "5px 0",
                    fontSize: "12px",
                    color: theme.mutedForeground,
                  }}
                >
                  Tax
                </td>
                <td
                  style={{
                    padding: "5px 0",
                    fontSize: "12px",
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
                      padding: "5px 0",
                      fontSize: "12px",
                      color: theme.mutedForeground,
                    }}
                  >
                    {row.label}
                  </td>
                  <td
                    style={{
                      padding: "5px 0",
                      fontSize: "12px",
                      color: theme.foreground,
                      textAlign: "right",
                    }}
                  >
                    {row.value}
                  </td>
                </tr>
              ))}

            <tr style={{ borderTop: `1px solid ${rowBorder}` }}>
              <td
                style={{
                  padding: "10px 0 2px",
                  fontSize: "13px",
                  color: theme.foreground,
                  fontWeight: "600",
                }}
              >
                {amountLabel}
              </td>
              <td
                style={{
                  padding: "10px 0 2px",
                  fontSize: "14px",
                  color: theme.foreground,
                  textAlign: "right",
                  fontWeight: "600",
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
