import * as React from "react";
import { Img, Text } from "@react-email/components";
import type { EmailTheme } from "../theme/types.js";

export interface BrandLogoProps {
  appName?: string;
  logoUrl?: string;
  logoWidth?: number | string;
  logoHeight?: number | string;
  logoRadius?: number | string;
  brandNameSize?: string;
  brandNameWeight?: string | number;
  showBrandName?: boolean;
  theme: EmailTheme;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  appName = "Limonify",
  logoUrl = "https://raw.githubusercontent.com/limonify/email-templates/main/.github/assets/logo.png",
  logoWidth = 26,
  logoHeight = 26,
  logoRadius = "6px",
  brandNameSize = "14px",
  brandNameWeight = "600",
  showBrandName = true,
  theme,
}) => {
  const resolvedWidth =
    typeof logoWidth === "number" ? `${logoWidth}px` : logoWidth;
  const resolvedHeight =
    typeof logoHeight === "number" ? `${logoHeight}px` : logoHeight;
  const resolvedRadius =
    typeof logoRadius === "number" ? `${logoRadius}px` : logoRadius;

  if (logoUrl) {
    return (
      <table style={{ margin: "0 0 24px 0" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "middle", width: resolvedWidth }}>
              <Img
                src={logoUrl}
                alt={appName}
                width={String(logoWidth).replace("px", "")}
                height={String(logoHeight).replace("px", "")}
                style={{
                  display: "block",
                  width: resolvedWidth,
                  height: resolvedHeight,
                  borderRadius: resolvedRadius,
                  outline: "none",
                  border: "none",
                }}
              />
            </td>
            {showBrandName && appName ? (
              <td style={{ paddingLeft: "10px", verticalAlign: "middle" }}>
                <Text
                  style={{
                    fontSize: brandNameSize,
                    fontWeight: brandNameWeight as any,
                    color: theme.foreground,
                    margin: 0,
                    letterSpacing: "-0.02em",
                    fontFamily: theme.fontFamily,
                  }}
                >
                  {appName}
                </Text>
              </td>
            ) : null}
          </tr>
        </tbody>
      </table>
    );
  }

  // Fallback monogram if no logo URL
  return (
    <table style={{ margin: "0 0 24px 0" }}>
      <tbody>
        <tr>
          <td style={{ verticalAlign: "middle", width: resolvedWidth }}>
            <div
              style={{
                width: resolvedWidth,
                height: resolvedHeight,
                lineHeight: resolvedHeight,
                borderRadius: resolvedRadius,
                backgroundColor: theme.primary,
                color: theme.primaryForeground,
                textAlign: "center",
                fontWeight: "700",
                fontSize:
                  typeof logoWidth === "number" && logoWidth > 32
                    ? "16px"
                    : "12px",
                fontFamily: theme.fontFamily,
                display: "inline-block",
                verticalAlign: "middle",
              }}
            >
              {appName.charAt(0).toUpperCase()}
            </div>
          </td>
          {showBrandName && appName ? (
            <td style={{ paddingLeft: "10px", verticalAlign: "middle" }}>
              <Text
                style={{
                  fontSize: brandNameSize,
                  fontWeight: brandNameWeight as any,
                  color: theme.foreground,
                  margin: 0,
                  letterSpacing: "-0.02em",
                  fontFamily: theme.fontFamily,
                }}
              >
                {appName}
              </Text>
            </td>
          ) : null}
        </tr>
      </tbody>
    </table>
  );
};
