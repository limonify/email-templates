import * as React from "react";
import { Text } from "@react-email/components";
import type { EmailTheme } from "../theme/types.js";

export interface OTPFieldProps {
  code: string;
  theme: EmailTheme;
}

export const OTPField: React.FC<OTPFieldProps> = ({ code, theme }) => {
  const cleanCode = code.replace(/\s+/g, "");
  const isDigits = /^\d{6}$/.test(cleanCode);

  if (isDigits) {
    const digits = cleanCode.split("");
    return (
      <table
        style={{
          margin: "20px 0",
          borderSpacing: "6px",
          borderCollapse: "separate",
        }}
      >
        <tbody>
          <tr>
            {digits.map((digit, idx) => (
              <td
                key={idx}
                style={{
                  width: "42px",
                  height: "46px",
                  textAlign: "center",
                  verticalAlign: "middle",
                  backgroundColor: theme.surface,
                  borderRadius: "8px",
                  border: `1px solid ${theme.surfaceBorder}`,
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: theme.foreground,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    letterSpacing: "-0.02em",
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

  // Dynamic template variable {{ .Code }}
  return (
    <div
      style={{
        backgroundColor: theme.surface,
        borderRadius: "8px",
        border: `1px solid ${theme.surfaceBorder}`,
        padding: "14px 20px",
        margin: "20px 0",
        textAlign: "left",
        display: "inline-block",
      }}
    >
      <span
        style={{
          fontSize: "24px",
          fontWeight: "600",
          letterSpacing: "6px",
          color: theme.foreground,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        {code}
      </span>
    </div>
  );
};
