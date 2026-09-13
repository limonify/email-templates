import * as React from "react";
import { Button as ReactEmailButton } from "@react-email/components";
import type { EmailTheme } from "../theme/types.js";

export interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
  theme: EmailTheme;
  align?: "left" | "center" | "right";
}

export const EmailButton: React.FC<EmailButtonProps> = ({
  href,
  children,
  size = "md",
  fontSize,
  padding,
  borderRadius,
  theme,
  align = "left",
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          padding: "8px 14px",
          fontSize: "12px",
        };
      case "lg":
        return {
          padding: "12px 24px",
          fontSize: "14px",
        };
      case "md":
      default:
        return {
          padding: theme.buttonPadding || "10px 20px",
          fontSize: theme.buttonFontSize || "13px",
        };
    }
  };

  const s = getSizeStyles();
  const resolvedPadding = padding || s.padding;
  const resolvedFontSize = fontSize || s.fontSize;
  const resolvedRadius = borderRadius || theme.buttonRadius || "8px";

  return (
    <div style={{ textAlign: align, margin: "24px 0" }}>
      <ReactEmailButton
        href={href}
        style={{
          backgroundColor: theme.primary,
          color: theme.primaryForeground,
          borderRadius: resolvedRadius,
          padding: resolvedPadding,
          fontWeight: "500",
          fontSize: resolvedFontSize,
          letterSpacing: "-0.01em",
          textDecoration: "none",
          display: "inline-block",
          textAlign: "center",
          fontFamily: theme.fontFamily,
          border:
            theme.primary === "#ffffff"
              ? "1px solid #e5e5e5"
              : "1px solid transparent",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        {children}
      </ReactEmailButton>
    </div>
  );
};
