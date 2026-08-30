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
  align = "center",
}) => {
  return (
    <div style={{ textAlign: align, margin: "28px 0" }}>
      <ReactEmailButton
        href={href}
        style={{
          backgroundColor: theme.primary,
          color: theme.primaryForeground,
          borderRadius: `calc(${theme.radius} - 4px)`,
          padding: "13px 32px",
          fontWeight: "600",
          fontSize: "14px",
          letterSpacing: "-0.01em",
          textDecoration: "none",
          display: "inline-block",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {children}
      </ReactEmailButton>
    </div>
  );
};
