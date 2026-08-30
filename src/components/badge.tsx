import * as React from "react";
import type { EmailTheme } from "../theme/types.js";

export interface EmailBadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "muted" | "outline";
  theme: EmailTheme;
}

export const EmailBadge: React.FC<EmailBadgeProps> = ({
  children,
  variant = "accent",
  theme,
}) => {
  const isAccent = variant === "accent";
  const isOutline = variant === "outline";

  return (
    <div
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "9999px",
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        backgroundColor: isAccent
          ? `${theme.accent}1a` // 10% opacity
          : isOutline
            ? "transparent"
            : theme.muted,
        color: isAccent ? theme.accent : theme.mutedForeground,
        border: isOutline ? `1px solid ${theme.surfaceBorder}` : "none",
        marginBottom: "12px",
      }}
    >
      {children}
    </div>
  );
};
