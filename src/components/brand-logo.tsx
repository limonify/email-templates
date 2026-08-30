import * as React from "react";
import { Img, Text } from "@react-email/components";
import type { EmailTheme } from "../theme/types.js";

export interface BrandLogoProps {
  appName?: string;
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
  theme: EmailTheme;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  appName = "Limonify",
  logoUrl,
  logoWidth = 36,
  logoHeight = 36,
  theme,
}) => {
  if (logoUrl) {
    return (
      <table style={{ margin: "0 auto" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "middle", textAlign: "center" }}>
              <Img
                src={logoUrl}
                alt={appName}
                width={String(logoWidth)}
                height={String(logoHeight)}
                style={{
                  display: "block",
                  margin: "0 auto",
                  borderRadius: logoWidth === logoHeight ? "10px" : "0",
                  outline: "none",
                  border: "none",
                  textDecoration: "none",
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  // Modern Limonify Monogram Mark
  const initial = (appName.trim().charAt(0) || "L").toUpperCase();

  return (
    <table style={{ margin: "0 auto" }}>
      <tbody>
        <tr>
          <td style={{ verticalAlign: "middle" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                lineHeight: "36px",
                borderRadius: "10px",
                backgroundColor: theme.surface,
                border: `1px solid ${theme.surfaceBorder}`,
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            >
              <span
                style={{
                  fontSize: "17px",
                  fontWeight: "800",
                  color: theme.accent,
                  fontFamily: theme.fontFamily,
                  letterSpacing: "-0.02em",
                }}
              >
                {initial}
              </span>
            </div>
          </td>
          <td style={{ paddingLeft: "12px", verticalAlign: "middle" }}>
            <Text
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: theme.foreground,
                margin: 0,
                letterSpacing: "-0.03em",
                fontFamily: theme.fontFamily,
              }}
            >
              {appName}
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
