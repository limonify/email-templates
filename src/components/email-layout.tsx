import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { BrandLogo } from "./brand-logo.js";
import type { EmailTheme, SocialLink } from "../theme/types.js";

export interface EmailLayoutProps {
  previewText?: string;
  appName?: string;
  logoUrl?: string;
  logoWidth?: number | string;
  logoHeight?: number | string;
  logoRadius?: number | string;
  brandNameSize?: string;
  brandNameWeight?: string | number;
  showBrandName?: boolean;
  containerWidth?: string;
  cardPadding?: string;
  cardRadius?: string;
  headingSize?: string;
  headingWeight?: string | number;
  headingLetterSpacing?: string;
  bodySize?: string;
  bodyLineHeight?: string;
  badgeText?: string;
  supportUrl?: string;
  supportText?: string;
  unsubscribeUrl?: string;
  companyAddress?: string;
  copyrightText?: string;
  socialLinks?: SocialLink[];
  align?: "left" | "center";
  cardStyle?: "double-frame" | "single" | "minimal";
  children: React.ReactNode;
  theme: EmailTheme;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({
  previewText,
  appName = "Limonify",
  logoUrl,
  logoWidth,
  logoHeight,
  logoRadius,
  brandNameSize,
  brandNameWeight,
  showBrandName = true,
  containerWidth,
  cardPadding,
  cardRadius,
  headingSize,
  headingWeight,
  headingLetterSpacing,
  bodySize,
  bodyLineHeight,
  badgeText,
  supportUrl = "https://limonify.com/support",
  supportText = "Need help or have questions?",
  unsubscribeUrl,
  companyAddress,
  copyrightText,
  socialLinks,
  align = "left",
  cardStyle = "double-frame",
  children,
  theme,
}) => {
  const isDark =
    theme.background === "#0a0a0a" || theme.background.startsWith("#0");
  const outerBg = isDark ? "#141414" : "#f4f4f5";
  const outerBorder = isDark ? "#222222" : "#e4e4e7";
  const innerBg = isDark ? "#0a0a0a" : "#ffffff";
  const innerBorder = isDark ? "#1f1f1f" : "#e5e5e5";

  const resolvedCardStyle = theme.cardStyle || cardStyle;
  const resolvedContainerWidth =
    containerWidth || theme.containerWidth || "520px";
  const resolvedCardPadding = cardPadding || theme.cardPadding || "30px 28px";
  const resolvedInnerRadius = cardRadius || theme.radius || "9px";

  return (
    <Html>
      <Head />
      {previewText ? <Preview>{previewText}</Preview> : null}
      <Body
        style={{
          backgroundColor: theme.background,
          fontFamily: theme.fontFamily,
          margin: 0,
          padding: "40px 0",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <Container
          style={{
            maxWidth: resolvedContainerWidth,
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          {/* Header Brand */}
          <Section style={{ marginBottom: "20px" }}>
            <BrandLogo
              appName={appName}
              logoUrl={logoUrl}
              logoWidth={logoWidth}
              logoHeight={logoHeight}
              logoRadius={logoRadius}
              brandNameSize={brandNameSize}
              brandNameWeight={brandNameWeight}
              showBrandName={showBrandName}
              theme={theme}
            />
          </Section>

          {/* Limonify Card Shell */}
          {resolvedCardStyle === "double-frame" ? (
            <Section
              style={{
                backgroundColor: outerBg,
                borderRadius: "12px",
                border: `1px solid ${outerBorder}`,
                padding: "5px",
              }}
            >
              <div
                style={{
                  backgroundColor: innerBg,
                  borderRadius: resolvedInnerRadius,
                  border: `1px solid ${innerBorder}`,
                  padding: resolvedCardPadding,
                }}
              >
                {children}
              </div>
            </Section>
          ) : resolvedCardStyle === "single" ? (
            <Section
              style={{
                backgroundColor: innerBg,
                borderRadius: resolvedInnerRadius,
                border: `1px solid ${innerBorder}`,
                padding: resolvedCardPadding,
              }}
            >
              {children}
            </Section>
          ) : (
            <Section style={{ padding: "8px 0" }}>{children}</Section>
          )}

          {/* Footer Section */}
          <Section style={{ marginTop: "28px", textAlign: "left" }}>
            {supportUrl ? (
              <Text
                style={{
                  fontSize: "12px",
                  color: theme.mutedForeground,
                  lineHeight: "18px",
                  margin: "0 0 6px",
                  fontFamily: theme.fontFamily,
                }}
              >
                {supportText}{" "}
                <Link
                  href={supportUrl}
                  style={{
                    color: theme.foreground,
                    textDecoration: "underline",
                  }}
                >
                  Contact support
                </Link>
              </Text>
            ) : null}

            {companyAddress ? (
              <Text
                style={{
                  fontSize: "11px",
                  color: theme.mutedForeground,
                  margin: "0 0 4px",
                  fontFamily: theme.fontFamily,
                }}
              >
                {companyAddress}
              </Text>
            ) : null}

            <Text
              style={{
                fontSize: "11px",
                color: isDark ? "#525252" : "#a1a1aa",
                margin: 0,
                fontFamily: theme.fontFamily,
              }}
            >
              {copyrightText ||
                `© ${new Date().getFullYear()} ${appName}. All rights reserved.`}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
