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
import type { EmailTheme } from "../theme/types.js";

export interface EmailLayoutProps {
  previewText?: string;
  appName?: string;
  logoUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
  badgeText?: string;
  supportUrl?: string;
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
  children,
  theme,
}) => {
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
          {/* Limonify Header */}
          <Section style={{ marginBottom: "28px", textAlign: "center" }}>
            <BrandLogo
              appName={appName}
              logoUrl={logoUrl}
              logoWidth={logoWidth}
              logoHeight={logoHeight}
              theme={theme}
            />
          </Section>

          {/* Limonify Signature Double-Frame Card */}
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

          {/* Limonify Footer */}
          <Section style={{ marginTop: "36px", textAlign: "center" }}>
            <Text
              style={{
                fontSize: "12px",
                color: theme.mutedForeground,
                lineHeight: "20px",
                margin: "0 0 10px",
              }}
            >
              Questions or need assistance?{" "}
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
            <Text
              style={{
                fontSize: "11px",
                color: theme.mutedForeground,
                opacity: 0.8,
                margin: 0,
              }}
            >
              © {new Date().getFullYear()} {appName}. Crafted with Limonify UI.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
