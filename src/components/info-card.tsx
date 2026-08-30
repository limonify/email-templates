import * as React from "react";
import { Text } from "@react-email/components";
import type { EmailTheme } from "../theme/types.js";

export interface InfoCardProps {
  title?: string;
  children: React.ReactNode;
  theme: EmailTheme;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
  theme,
}) => {
  return (
    <div
      style={{
        backgroundColor: theme.surface,
        borderRadius: "8px",
        border: `1px solid ${theme.surfaceBorder}`,
        padding: "14px 16px",
        margin: "20px 0",
      }}
    >
      {title ? (
        <Text
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: theme.foreground,
            margin: "0 0 4px",
            letterSpacing: "-0.01em",
            fontFamily: theme.fontFamily,
          }}
        >
          {title}
        </Text>
      ) : null}
      <div
        style={{
          fontSize: "13px",
          color: theme.mutedForeground,
          lineHeight: "20px",
          fontFamily: theme.fontFamily,
        }}
      >
        {children}
      </div>
    </div>
  );
};
