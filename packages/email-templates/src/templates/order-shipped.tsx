import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { EmailBadge } from "../components/badge.js";
import type { EmailTheme } from "../theme/types.js";

export interface OrderShippedEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  heading?: string;
  description?: string;
  orderId?: string;
  trackingNumber?: string;
  trackingLabel?: string;
  carrier?: string;
  carrierLabel?: string;
  estDelivery?: string;
  estDeliveryLabel?: string;
  trackingUrl?: string;
  buttonText?: string;
}

export const OrderShippedEmail: React.FC<OrderShippedEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Shipped",
  heading = "Your order is on the way",
  orderId = "{{ .OrderID }}",
  trackingNumber = "{{ .TrackingNumber }}",
  trackingLabel = "Tracking number",
  carrier = "DHL Express",
  carrierLabel = "Carrier",
  estDelivery = "Thursday, Sept 3",
  estDeliveryLabel = "Estimated delivery",
  trackingUrl = "{{ .TrackingURL }}",
  buttonText = "Track shipment",
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
    `Your order ${orderId} has been packed and handed over to ${carrier}.`;

  return (
    <EmailLayout
      previewText={`Your order ${orderId} has shipped`}
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
          margin: "0 0 16px",
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedDescription}
      </Text>

      {/* Shipment Details Box */}
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
                {carrierLabel}
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
                {carrier}
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
                {trackingLabel}
              </td>
              <td
                style={{
                  padding: "4px 0",
                  fontSize: "12px",
                  color: theme.foreground,
                  textAlign: "right",
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                {trackingNumber}
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
                {estDeliveryLabel}
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
                {estDelivery}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={trackingUrl} theme={theme}>
        {buttonText}
      </EmailButton>
    </EmailLayout>
  );
};
