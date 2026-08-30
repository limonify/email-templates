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
        backgroundColor: theme.background,
        borderRadius: theme.radius,
        border: `1px solid ${theme.surfaceBorder}`,
        padding: "16px 20px",
        margin: "24px 0",
        textAlign: "center",
      }}
    >
      <Text
        style={{
          fontSize: "28px",
          fontWeight: "700",
          letterSpacing: "6px",
          color: theme.primary,
          margin: 0,
          fontFamily: "monospace, Courier, sans-serif",
        }}
      >
        {code}
      </Text>
    </div>
  );
};
