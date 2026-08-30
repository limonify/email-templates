import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
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
  logoWidth?: number;
  logoHeight?: number;
  badgeText?: string;
  supportUrl?: string;
  supportText?: string;
  unsubscribeUrl?: string;
  companyAddress?: string;
  copyrightText?: string;
  socialLinks?: SocialLink[];
  align?: "center" | "left";
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
  badgeText,
  supportUrl = "https://limonify.com/support",
  supportText = "Have questions or need assistance?",
  unsubscribeUrl,
  companyAddress,
  copyrightText,
  socialLinks,
  align = "center",
  cardStyle = "double-frame",
  children,
  theme,
}) => {
  const resolvedCardStyle = theme.cardStyle || cardStyle;

  return (
    <Html>
      <Head />
      {previewText ? <Preview>{previewText}</Preview> : null}
      <Body
        style={{
          backgroundColor: theme.background,
          fontFamily: theme.fontFamily,
          margin: 0,
          padding: "48px 0",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <Container
          style={{
            maxWidth: "540px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          {/* Header Branding */}
          <Section style={{ marginBottom: "28px", textAlign: align }}>
            <BrandLogo
              appName={appName}
              logoUrl={logoUrl}
              logoWidth={logoWidth}
              logoHeight={logoHeight}
              theme={theme}
            />
          </Section>

          {/* Main Card Shell according to cardStyle */}
          {resolvedCardStyle === "double-frame" ? (
            <Section
              style={{
                backgroundColor: theme.muted,
                borderRadius: `calc(${theme.radius} + 6px)`,
                border: `1px solid ${theme.surfaceBorder}`,
                padding: "6px",
                boxShadow:
                  "0 10px 30px -10px rgba(0, 0, 0, 0.12), 0 20px 25px -5px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div
                style={{
                  backgroundColor: theme.surface,
                  borderRadius: theme.radius,
                  border: `1px solid ${theme.surfaceBorder}`,
                  padding: "36px 32px",
                }}
              >
                {badgeText ? (
                  <div
                    style={{
                      display: "inline-block",
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      backgroundColor: `${theme.accent}1a`,
                      color: theme.accent,
                      marginBottom: "16px",
                    }}
                  >
                    {badgeText}
                  </div>
                ) : null}

                {children}
              </div>
            </Section>
          ) : resolvedCardStyle === "single" ? (
            <Section
              style={{
                backgroundColor: theme.surface,
                borderRadius: theme.radius,
                border: `1px solid ${theme.surfaceBorder}`,
                padding: "36px 32px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
              }}
            >
              {badgeText ? (
                <div
                  style={{
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    backgroundColor: `${theme.accent}1a`,
                    color: theme.accent,
                    marginBottom: "16px",
                  }}
                >
                  {badgeText}
                </div>
              ) : null}

              {children}
            </Section>
          ) : (
            // Minimal / Flat style
            <Section style={{ padding: "16px 0" }}>
              {badgeText ? (
                <div
                  style={{
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: "9999px",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    backgroundColor: `${theme.accent}1a`,
                    color: theme.accent,
                    marginBottom: "16px",
                  }}
                >
                  {badgeText}
                </div>
              ) : null}

              {children}
            </Section>
          )}

          {/* Footer Section */}
          <Section style={{ marginTop: "36px", textAlign: "center" }}>
            {/* Social Links if provided */}
            {socialLinks && socialLinks.length > 0 ? (
              <div style={{ marginBottom: "16px" }}>
                {socialLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    style={{
                      display: "inline-block",
                      margin: "0 8px",
                      fontSize: "12px",
                      color: theme.mutedForeground,
                      textDecoration: "none",
                      textTransform: "capitalize",
                    }}
                  >
                    {link.platform}
                  </Link>
                ))}
              </div>
            ) : null}

            {/* Support Link */}
            {supportUrl ? (
              <Text
                style={{
                  fontSize: "12px",
                  color: theme.mutedForeground,
                  lineHeight: "20px",
                  margin: "0 0 8px",
                }}
              >
                {supportText}{" "}
                <Link
                  href={supportUrl}
                  style={{
                    color: theme.foreground,
                    fontWeight: "500",
                    textDecoration: "underline",
                  }}
                >
                  Contact Support
                </Link>
              </Text>
            ) : null}

            {/* Company Address if provided */}
            {companyAddress ? (
              <Text
                style={{
                  fontSize: "11px",
                  color: theme.mutedForeground,
                  margin: "0 0 6px",
                }}
              >
                {companyAddress}
              </Text>
            ) : null}

            {/* Copyright */}
            <Text
              style={{
                fontSize: "11px",
                color: theme.mutedForeground,
                opacity: 0.8,
                margin: 0,
              }}
            >
              {copyrightText ||
                `© ${new Date().getFullYear()} ${appName}. All rights reserved.`}
            </Text>

            {/* Unsubscribe link if provided */}
            {unsubscribeUrl ? (
              <Text
                style={{
                  fontSize: "11px",
                  color: theme.mutedForeground,
                  marginTop: "8px",
                }}
              >
                <Link
                  href={unsubscribeUrl}
                  style={{
                    color: theme.mutedForeground,
                    textDecoration: "underline",
                  }}
                >
                  Unsubscribe from emails
                </Link>
              </Text>
            ) : null}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
