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
  return (
    <table
      style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}
    >
      <tbody>
        {steps.map((step, idx) => (
          <tr key={idx}>
            <td
              style={{
                width: "36px",
                verticalAlign: "top",
                paddingBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  lineHeight: "28px",
                  borderRadius: "50%",
                  backgroundColor: step.completed ? theme.accent : theme.muted,
                  color: step.completed
                    ? theme.accentForeground
                    : theme.foreground,
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: "12px",
                  border: `1px solid ${theme.surfaceBorder}`,
                }}
              >
                {step.completed ? "✓" : step.number}
              </div>
            </td>
            <td
              style={{
                verticalAlign: "top",
                paddingLeft: "8px",
                paddingBottom: "16px",
              }}
            >
              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: theme.foreground,
                  margin: "0 0 2px",
                }}
              >
                {step.title}
              </Text>
              <Text
                style={{
                  fontSize: "13px",
                  color: theme.mutedForeground,
                  lineHeight: "18px",
                  margin: 0,
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
