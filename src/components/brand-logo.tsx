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
  logoWidth = 28,
  logoHeight = 28,
  theme,
}) => {
  if (logoUrl) {
    return (
      <table style={{ margin: "0 0 24px 0" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "middle" }}>
              <Img
                src={logoUrl}
                alt={appName}
                width={String(logoWidth)}
                height={String(logoHeight)}
                style={{
                  display: "block",
                  borderRadius: "6px",
                  outline: "none",
                  border: "none",
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  // Clean, modern SVG monogram icon + wordmark
  return (
    <table style={{ margin: "0 0 24px 0" }}>
      <tbody>
        <tr>
          <td style={{ verticalAlign: "middle", width: "26px" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                lineHeight: "24px",
                borderRadius: "6px",
                backgroundColor: theme.primary,
                color: theme.primaryForeground,
                textAlign: "center",
                fontWeight: "700",
                fontSize: "12px",
                fontFamily: theme.fontFamily,
                display: "inline-block",
                verticalAlign: "middle",
              }}
            >
              {appName.charAt(0).toUpperCase()}
            </div>
          </td>
          <td style={{ paddingLeft: "8px", verticalAlign: "middle" }}>
            <Text
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: theme.foreground,
                margin: 0,
                letterSpacing: "-0.02em",
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
