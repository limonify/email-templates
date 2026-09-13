import * as React from "react";
import { Text } from "@react-email/components";
import type { EmailTheme } from "../theme/types.js";

export interface StepItem {
  number: number | string;
  title: string;
  description: string;
  completed?: boolean;
}

export interface StepsListProps {
  steps: StepItem[];
  theme: EmailTheme;
}

export const StepsList: React.FC<StepsListProps> = ({ steps, theme }) => {
  const isDark =
    theme.background === "#0a0a0a" || theme.background.startsWith("#0");

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        margin: "18px 0",
        fontFamily: theme.fontFamily,
      }}
    >
      <tbody>
        {steps.map((step, idx) => (
          <tr key={idx}>
            <td
              style={{
                width: "32px",
                verticalAlign: "top",
                paddingBottom: "14px",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  lineHeight: "22px",
                  borderRadius: "50%",
                  backgroundColor: step.completed
                    ? isDark
                      ? "#262626"
                      : "#e4e4e7"
                    : "transparent",
                  color: step.completed
                    ? theme.foreground
                    : theme.mutedForeground,
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "11px",
                  border: `1px solid ${theme.surfaceBorder}`,
                }}
              >
                {step.completed ? "✓" : step.number}
              </div>
            </td>
            <td
              style={{
                verticalAlign: "top",
                paddingLeft: "6px",
                paddingBottom: "14px",
              }}
            >
              <Text
                style={{
                  fontSize: "13px",
                  fontWeight: "500",
                  color: theme.foreground,
                  margin: "0 0 2px",
                  fontFamily: theme.fontFamily,
                }}
              >
                {step.title}
              </Text>
              <Text
                style={{
                  fontSize: "12px",
                  color: theme.mutedForeground,
                  lineHeight: "18px",
                  margin: 0,
                  fontFamily: theme.fontFamily,
                }}
              >
                {step.description}
              </Text>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
