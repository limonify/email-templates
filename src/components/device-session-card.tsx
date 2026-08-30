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
  return (
    <div
      style={{
        backgroundColor: theme.muted,
        borderRadius: `calc(${theme.radius} - 4px)`,
        border: `1px solid ${theme.surfaceBorder}`,
        padding: "16px 20px",
        margin: "20px 0",
      }}
    >
      <Text
        style={{
          fontSize: "12px",
          fontWeight: "700",
          color: theme.foreground,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          margin: "0 0 12px",
        }}
      >
        Device & Session Details
      </Text>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td
              style={{
                padding: "4px 0",
                fontSize: "13px",
                color: theme.mutedForeground,
              }}
            >
              Device / OS:
            </td>
            <td
              style={{
                padding: "4px 0",
                fontSize: "13px",
                color: theme.foreground,
                textAlign: "right",
                fontWeight: "500",
              }}
            >
              {device}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "4px 0",
                fontSize: "13px",
                color: theme.mutedForeground,
              }}
            >
              Location:
            </td>
            <td
              style={{
                padding: "4px 0",
                fontSize: "13px",
                color: theme.foreground,
                textAlign: "right",
                fontWeight: "500",
              }}
            >
              {location}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "4px 0",
                fontSize: "13px",
                color: theme.mutedForeground,
              }}
            >
              IP Address:
            </td>
            <td
              style={{
                padding: "4px 0",
                fontSize: "13px",
                color: theme.foreground,
                textAlign: "right",
                fontFamily: "monospace",
              }}
            >
              {ipAddress}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "4px 0",
                fontSize: "13px",
                color: theme.mutedForeground,
              }}
            >
              Time:
            </td>
            <td
              style={{
                padding: "4px 0",
                fontSize: "13px",
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
