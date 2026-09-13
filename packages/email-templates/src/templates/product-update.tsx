import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { EmailButton } from "../components/button.js";
import { EmailBadge } from "../components/badge.js";
import type { EmailTheme } from "../theme/types.js";

export interface ChangelogItem {
  title: string;
  description: string;
  tag?: string;
}

export interface ProductUpdateEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  version?: string;
  heading?: string;
  description?: string;
  changelogUrl?: string;
  buttonText?: string;
  items?: ChangelogItem[];
}

export const ProductUpdateEmail: React.FC<ProductUpdateEmailProps> = ({
  appName = "{{ .AppName }}",
  version = "{{ .Version }}",
  badgeText = "Changelog",
  heading,
  description,
  changelogUrl = "{{ .ChangelogURL }}",
  buttonText = "Read full release notes",
  items,
  theme,
  ...layoutProps
}) => {
  const isDark =
    theme.background === "#0a0a0a" || theme.background.startsWith("#0");
  const itemBorder = isDark ? "#1f1f1f" : "#f0f0f0";

  const resolvedHeading = heading || `What's new in ${appName} ${version}`;
  const resolvedDescription =
    description ||
    "Here are the latest features, improvements, and updates shipped in this release:";

  const defaultItems: ChangelogItem[] = [
    {
      title: "Design System Tokens v2",
      description:
        "Synchronized cross-platform color palettes and elevated micro-interactions.",
      tag: "New",
    },
    {
      title: "Improved Performance",
      description:
        "Reduced bundle sizes by 40% with zero runtime layout shift.",
      tag: "Improved",
    },
  ];

  const resolvedItems = items || defaultItems;

  return (
    <EmailLayout
      previewText={`What's new in ${appName} ${version}`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="neutral" theme={theme}>
        {badgeText}
      </EmailBadge>

      <Heading
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: theme.foreground,
          margin: "0 0 8px",
          letterSpacing: "-0.025em",
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedHeading}
      </Heading>

      <Text
        style={{
          fontSize: "13px",
          color: theme.mutedForeground,
          lineHeight: "20px",
          margin: "0 0 18px",
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedDescription}
      </Text>

      {/* Feature updates list */}
      <div style={{ margin: "14px 0 20px", fontFamily: theme.fontFamily }}>
        {resolvedItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: "10px 0",
              borderBottom:
                idx < resolvedItems.length - 1
                  ? `1px solid ${itemBorder}`
                  : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "3px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: theme.foreground,
                }}
              >
                {item.title}
              </span>
              {item.tag ? (
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    padding: "1px 5px",
                    borderRadius: "4px",
                    backgroundColor: isDark ? "#262626" : "#e4e4e7",
                    color: isDark ? "#d4d4d4" : "#52525b",
                    marginLeft: "8px",
                  }}
                >
                  {item.tag}
                </span>
              ) : null}
            </div>
            <p
              style={{
                fontSize: "12px",
                color: theme.mutedForeground,
                lineHeight: "18px",
                margin: 0,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <EmailButton href={changelogUrl} theme={theme}>
        {buttonText}
      </EmailButton>
    </EmailLayout>
  );
};
