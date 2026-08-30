import * as React from "react";
import type { EmailTheme } from "../theme/types.js";

export interface EmailBadgeProps {
  children: React.ReactNode;
  variant?: "neutral" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md";
  fontSize?: string;
  padding?: string;
  dot?: boolean;
  theme: EmailTheme;
}

export const EmailBadge: React.FC<EmailBadgeProps> = ({
  children,
  variant = "neutral",
  size = "md",
  fontSize,
  padding,
  dot = false,
  theme,
}) => {
  const isDark =
    theme.background === "#0a0a0a" || theme.background.startsWith("#0");

  const getStyle = () => {
    switch (variant) {
      case "success":
        return {
          bg: isDark ? "rgba(34, 197, 94, 0.08)" : "rgba(34, 197, 94, 0.08)",
          text: "#22c55e",
          border: isDark ? "rgba(34, 197, 94, 0.2)" : "rgba(34, 197, 94, 0.3)",
          dot: "#22c55e",
        };
      case "warning":
        return {
          bg: isDark ? "rgba(234, 179, 8, 0.08)" : "rgba(234, 179, 8, 0.08)",
          text: isDark ? "#facc15" : "#ca8a04",
          border: isDark ? "rgba(234, 179, 8, 0.2)" : "rgba(234, 179, 8, 0.3)",
          dot: isDark ? "#facc15" : "#ca8a04",
        };
      case "error":
        return {
          bg: isDark ? "rgba(239, 68, 68, 0.08)" : "rgba(239, 68, 68, 0.08)",
          text: "#ef4444",
          border: isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.3)",
          dot: "#ef4444",
        };
      case "outline":
        return {
          bg: "transparent",
          text: theme.mutedForeground,
          border: theme.surfaceBorder,
          dot: theme.mutedForeground,
        };
      case "neutral":
      default:
        return {
          bg: isDark ? "#1a1a1a" : "#f4f4f5",
          text: isDark ? "#a3a3a3" : "#52525b",
          border: isDark ? "#2e2e2e" : "#e4e4e7",
          dot: isDark ? "#737373" : "#a1a1aa",
        };
    }
  };

  const s = getStyle();
  const resolvedFontSize =
    fontSize || (size === "sm" ? "10px" : theme.badgeFontSize || "11px");
  const resolvedPadding =
    padding || (size === "sm" ? "2px 6px" : theme.badgePadding || "3px 8px");

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
              padding: resolvedPadding,
              borderRadius: "6px",
              backgroundColor: s.bg,
              border: `1px solid ${s.border}`,
              fontSize: resolvedFontSize,
              fontWeight: "500",
              letterSpacing: "0.02em",
              color: s.text,
              fontFamily: theme.fontFamily,
              lineHeight: "14px",
            }}
          >
            {dot ? (
              <span
                style={{
                  display: "inline-block",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: s.dot,
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
