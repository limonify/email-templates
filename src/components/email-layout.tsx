import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { EmailTheme } from "../theme/types.js";

export interface EmailLayoutProps {
  previewText?: string;
  appName?: string;
  logoUrl?: string;
  badgeText?: string;
  supportUrl?: string;
  children: React.ReactNode;
  theme: EmailTheme;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({
  previewText,
  appName = "Limonify",
  logoUrl,
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
            <table style={{ margin: "0 auto" }}>
              <tbody>
                <tr>
                  <td>
                    {logoUrl ? (
                      <Img
                        src={logoUrl}
                        alt={appName}
                        width="36"
                        height="36"
                        style={{
                          borderRadius: "10px",
                          display: "inline-block",
                          verticalAlign: "middle",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "inline-block",
                          width: "36px",
                          height: "36px",
                          lineHeight: "36px",
                          borderRadius: "10px",
                          backgroundColor: theme.surface,
                          border: `1px solid ${theme.surfaceBorder}`,
                          textAlign: "center",
                          color: theme.accent,
                          fontWeight: "800",
                          fontSize: "18px",
                          verticalAlign: "middle",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        🍋
                      </div>
                    )}
                  </td>
                  <td style={{ paddingLeft: "10px", verticalAlign: "middle" }}>
                    <Text
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: theme.foreground,
                        margin: 0,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {appName}
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
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
