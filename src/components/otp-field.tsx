import * as React from "react";
import { Text } from "@react-email/components";
import type { EmailTheme } from "../theme/types.js";

export interface OTPFieldProps {
  code: string;
  theme: EmailTheme;
}

export const OTPField: React.FC<OTPFieldProps> = ({ code, theme }) => {
  // If code is a 6-digit static string (e.g., '849201')
  const cleanCode = code.replace(/\s+/g, "");
  const isDigits = /^\d{6}$/.test(cleanCode);

  if (isDigits) {
    const digits = cleanCode.split("");
    return (
      <table
        style={{
          margin: "24px auto",
          borderSpacing: "8px",
          borderCollapse: "separate",
        }}
      >
        <tbody>
          <tr>
            {digits.map((digit, idx) => (
              <td
                key={idx}
                style={{
                  width: "46px",
                  height: "54px",
                  textAlign: "center",
                  verticalAlign: "middle",
                  backgroundColor: theme.muted,
                  borderRadius: `calc(${theme.radius} - 4px)`,
                  border: `1px solid ${idx === 0 ? theme.accent : theme.surfaceBorder}`,
                  boxShadow: idx === 0 ? `0 0 0 2px ${theme.accent}33` : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "26px",
                    fontWeight: "800",
                    color: idx === 0 ? theme.accent : theme.foreground,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  }}
                >
                  {digit}
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  // Dynamic template variable {{ .Code }} or custom variable format
  return (
    <div
      style={{
        backgroundColor: theme.muted,
        borderRadius: theme.radius,
        border: `1px solid ${theme.surfaceBorder}`,
        padding: "18px 24px",
        margin: "24px 0",
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
