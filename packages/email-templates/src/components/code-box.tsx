import * as React from "react";
import { Text } from "@react-email/components";
import type { EmailTheme } from "../theme/types.js";

export interface CodeBoxProps {
  code: string;
  theme: EmailTheme;
}

export const CodeBox: React.FC<CodeBoxProps> = ({ code, theme }) => {
  return (
    <div
      style={{
        backgroundColor: theme.muted,
        borderRadius: theme.radius,
        border: `1px solid ${theme.surfaceBorder}`,
        padding: "20px 24px",
        margin: "28px 0",
        textAlign: "center",
        boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Text
        style={{
          fontSize: "32px",
          fontWeight: "800",
          letterSpacing: "8px",
          color: theme.accent,
          margin: 0,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        {code}
      </Text>
    </div>
  );
};
