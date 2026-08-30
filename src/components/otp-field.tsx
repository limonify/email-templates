import * as React from "react";
import type { EmailTheme } from "../theme/types.js";

export interface OTPFieldProps {
  code: string;
  slotWidth?: string | number;
  slotHeight?: string | number;
  digitSize?: string;
  slotSpacing?: string | number;
  slotRadius?: string;
  theme: EmailTheme;
}

export const OTPField: React.FC<OTPFieldProps> = ({
  code,
  slotWidth = "42px",
  slotHeight = "46px",
  digitSize = "20px",
  slotSpacing = "6px",
  slotRadius = "8px",
  theme,
}) => {
  const cleanCode = code.replace(/\s+/g, "");
  const isDigits = /^\d{6}$/.test(cleanCode);

  const resolvedSlotWidth =
    typeof slotWidth === "number" ? `${slotWidth}px` : slotWidth;
  const resolvedSlotHeight =
    typeof slotHeight === "number" ? `${slotHeight}px` : slotHeight;
  const resolvedSpacing =
    typeof slotSpacing === "number" ? `${slotSpacing}px` : slotSpacing;

  if (isDigits) {
    const digits = cleanCode.split("");
    return (
      <table
        style={{
          margin: "20px 0",
          borderSpacing: resolvedSpacing,
          borderCollapse: "separate",
        }}
      >
        <tbody>
          <tr>
            {digits.map((digit, idx) => (
              <td
                key={idx}
                style={{
                  width: resolvedSlotWidth,
                  height: resolvedSlotHeight,
                  textAlign: "center",
                  verticalAlign: "middle",
                  backgroundColor: theme.surface,
                  borderRadius: slotRadius,
                  border: `1px solid ${theme.surfaceBorder}`,
                }}
              >
                <span
                  style={{
                    fontSize: digitSize,
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
        borderRadius: slotRadius,
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
