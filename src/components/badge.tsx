import * as React from "react";
import type { EmailTheme } from "../theme/types.js";

export interface EmailBadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "success" | "warning" | "error" | "muted" | "outline";
  dot?: boolean;
  theme: EmailTheme;
}

export const EmailBadge: React.FC<EmailBadgeProps> = ({
  children,
  variant = "accent",
  dot = false,
  theme,
}) => {
  const getColors = () => {
    switch (variant) {
      case "success":
        return {
          bg: "rgba(34, 197, 94, 0.12)",
          text: "#22c55e",
          dot: "#22c55e",
          border: "rgba(34, 197, 94, 0.25)",
        };
      case "warning":
        return {
          bg: "rgba(234, 179, 8, 0.12)",
          text: "#eab308",
          dot: "#eab308",
          border: "rgba(234, 179, 8, 0.25)",
        };
      case "error":
        return {
          bg: "rgba(239, 68, 68, 0.12)",
          text: "#ef4444",
          dot: "#ef4444",
          border: "rgba(239, 68, 68, 0.25)",
        };
      case "muted":
        return {
          bg: theme.muted,
          text: theme.mutedForeground,
          dot: theme.mutedForeground,
          border: theme.surfaceBorder,
        };
      case "outline":
        return {
          bg: "transparent",
          text: theme.foreground,
          dot: theme.accent,
          border: theme.surfaceBorder,
        };
      case "accent":
      default:
        return {
          bg: `${theme.accent}1f`,
          text: theme.accent,
          dot: theme.accent,
          border: `${theme.accent}33`,
        };
    }
  };

  const colors = getColors();

  return (
    <table
      style={{
        display: "inline-table",
        verticalAlign: "middle",
        margin: "0 0 16px 0",
      }}
    >
      <tbody>
        <tr>
          <td
            style={{
              padding: "4px 10px",
              borderRadius: "9999px",
              backgroundColor: colors.bg,
              border: `1px solid ${colors.border}`,
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: colors.text,
              fontFamily: theme.fontFamily,
              lineHeight: "14px",
            }}
          >
            {dot ? (
              <span
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: colors.dot,
                  marginRight: "6px",
                  verticalAlign: "middle",
                }}
              />
            ) : null}
            <span style={{ verticalAlign: "middle" }}>{children}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
