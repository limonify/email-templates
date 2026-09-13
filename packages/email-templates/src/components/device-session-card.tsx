import * as React from "react";
import { Text } from "@react-email/components";
import type { EmailTheme } from "../theme/types.js";

export interface DeviceSessionProps {
  device?: string;
  browser?: string;
  location?: string;
  ipAddress?: string;
  timestamp?: string;
  theme: EmailTheme;
}

export const DeviceSessionCard: React.FC<DeviceSessionProps> = ({
  device = "macOS (Safari)",
  browser = "Safari 18.2",
  location = "San Francisco, CA, United States",
  ipAddress = "192.0.2.1",
  timestamp = "Just now",
  theme,
}) => {
  const isDark =
    theme.background === "#0a0a0a" || theme.background.startsWith("#0");
  const cardBg = isDark ? "#111111" : "#f9f9fb";
  const cardBorder = isDark ? "#222222" : "#ebebeb";

  return (
    <div
      style={{
        backgroundColor: cardBg,
        borderRadius: "8px",
        border: `1px solid ${cardBorder}`,
        padding: "14px 16px",
        margin: "18px 0",
      }}
    >
      <Text
        style={{
          fontSize: "11px",
          fontWeight: "600",
          color: theme.mutedForeground,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          margin: "0 0 10px",
          fontFamily: theme.fontFamily,
        }}
      >
        Session details
      </Text>
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
                padding: "3px 0",
                fontSize: "12px",
                color: theme.mutedForeground,
              }}
            >
              Device
            </td>
            <td
              style={{
                padding: "3px 0",
                fontSize: "12px",
                color: theme.foreground,
                textAlign: "right",
              }}
            >
              {device}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "3px 0",
                fontSize: "12px",
                color: theme.mutedForeground,
              }}
            >
              Location
            </td>
            <td
              style={{
                padding: "3px 0",
                fontSize: "12px",
                color: theme.foreground,
                textAlign: "right",
              }}
            >
              {location}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "3px 0",
                fontSize: "12px",
                color: theme.mutedForeground,
              }}
            >
              IP address
            </td>
            <td
              style={{
                padding: "3px 0",
                fontSize: "12px",
                color: theme.foreground,
                textAlign: "right",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              {ipAddress}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "3px 0",
                fontSize: "12px",
                color: theme.mutedForeground,
              }}
            >
              Timestamp
            </td>
            <td
              style={{
                padding: "3px 0",
                fontSize: "12px",
                color: theme.foreground,
                textAlign: "right",
              }}
            >
              {timestamp}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
