import * as React from "react";
import { Button as ReactEmailButton } from "@react-email/components";
import type { EmailTheme } from "../theme/types.js";

export interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
  theme: EmailTheme;
  align?: "left" | "center" | "right";
}

export const EmailButton: React.FC<EmailButtonProps> = ({
  href,
  children,
  theme,
  align = "left",
}) => {
  return (
    <div style={{ textAlign: align, margin: "24px 0" }}>
      <ReactEmailButton
        href={href}
        style={{
          backgroundColor: theme.primary,
          color: theme.primaryForeground,
          borderRadius: "8px",
          padding: "10px 20px",
          fontWeight: "500",
          fontSize: "13px",
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
