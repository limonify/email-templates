import * as React from "react";
import type { EmailTheme } from "../theme/types.js";

export interface GradientGlowProps {
  theme: EmailTheme;
}

export const GradientGlow: React.FC<GradientGlowProps> = ({ theme }) => {
  return (
    <div
      style={{
        height: "2px",
        width: "100%",
        background: `linear-gradient(90deg, transparent 0%, ${theme.accent} 50%, transparent 100%)`,
        opacity: 0.8,
        margin: "0 auto 28px",
      }}
    />
  );
};
