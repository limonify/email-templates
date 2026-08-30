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
        backgroundColor: theme.background,
        borderRadius: theme.radius,
        border: `1px solid ${theme.surfaceBorder}`,
        padding: "16px",
        margin: "20px 0",
      }}
    >
      {title ? (
        <Text
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: theme.foreground,
            margin: "0 0 6px",
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
        }}
      >
        {children}
      </div>
    </div>
  );
};
