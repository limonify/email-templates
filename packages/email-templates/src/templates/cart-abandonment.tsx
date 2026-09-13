import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { EmailBadge } from "../components/badge.js";
import type { EmailTheme } from "../theme/types.js";

export interface CartItem {
  name: string;
  quantity: number | string;
  price: string;
}

export interface CartAbandonmentEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  heading?: string;
  description?: string;
  cartTotal?: string;
  totalLabel?: string;
  checkoutUrl?: string;
  buttonText?: string;
  items?: CartItem[];
}

export const CartAbandonmentEmail: React.FC<CartAbandonmentEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Saved cart",
  heading = "You left items in your cart",
  cartTotal = "{{ .CartTotal }}",
  totalLabel = "Cart subtotal",
  checkoutUrl = "{{ .CheckoutURL }}",
  buttonText = "Complete checkout",
  items,
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
    "The items in your shopping cart are reserved for a limited time. Complete your order before items sell out.";

  const defaultItems: CartItem[] = [
    {
      name: "Limonify UI Team License (Annual)",
      quantity: 1,
      price: "$199.00",
    },
  ];

  const resolvedItems = items || defaultItems;

  return (
    <EmailLayout
      previewText="Your cart is waiting for you"
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
          margin: "0 0 16px",
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedDescription}
      </Text>

      {/* Cart Items Box */}
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
            {resolvedItems.map((item, idx) => (
              <tr key={idx}>
                <td
                  style={{
                    padding: "4px 0",
                    fontSize: "12px",
                    color: theme.foreground,
                  }}
                >
                  {item.name}{" "}
                  <span style={{ color: theme.mutedForeground }}>
                    × {item.quantity}
                  </span>
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
                  {item.price}
                </td>
              </tr>
            ))}
            <tr
              style={{
                borderTop: `1px solid ${isDark ? "#1f1f1f" : "#f0f0f0"}`,
              }}
            >
              <td
                style={{
                  padding: "10px 0 2px",
                  fontSize: "12px",
                  color: theme.mutedForeground,
                }}
              >
                {totalLabel}
              </td>
              <td
                style={{
                  padding: "10px 0 2px",
                  fontSize: "13px",
                  color: theme.foreground,
                  textAlign: "right",
                  fontWeight: "600",
                }}
              >
                {cartTotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={checkoutUrl} theme={theme}>
        {buttonText}
      </EmailButton>
    </EmailLayout>
  );
};
