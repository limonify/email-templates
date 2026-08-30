import * as React from "react";
import { Heading, Text } from "@react-email/components";
import {
  EmailLayout,
  type EmailLayoutProps,
} from "../components/email-layout.js";
import { OTPField } from "../components/otp-field.js";
import { EmailBadge } from "../components/badge.js";
import type { EmailTheme } from "../theme/types.js";

export interface OTPEmailProps extends Partial<
  Omit<EmailLayoutProps, "children" | "theme">
> {
  theme: EmailTheme;
  heading?: string;
  description?: string;
  code?: string;
  expiresIn?: string;
  expirationText?: string;
  securityNotice?: string;
}

export const OTPEmail: React.FC<OTPEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Security Verification",
  heading = "Sign In Verification Code",
  description = "Please use the one-time verification code below to securely authenticate your session:",
  code = "{{ .Code }}",
  expiresIn = "{{ .ExpiresIn }}",
  expirationText,
  securityNotice,
  theme,
  ...layoutProps
}) => {
  const resolvedExpiration =
    expirationText || `This code is valid for ${expiresIn}.`;
  const resolvedNotice =
    securityNotice ||
    "If you didn't initiate this request, no action is required and you can safely disregard this message.";

  return (
    <EmailLayout
      previewText={`Your verification code: ${code}`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="accent" dot={true} theme={theme}>
        {badgeText}
      </EmailBadge>

      {heading ? (
        <Heading
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: theme.foreground,
            margin: "0 0 10px",
            letterSpacing: "-0.025em",
          }}
        >
          {heading}
        </Heading>
      ) : null}

      {description ? (
        <Text
          style={{
            fontSize: "14px",
            color: theme.mutedForeground,
            lineHeight: "22px",
            margin: "0 0 16px",
          }}
        >
          {description}
        </Text>
      ) : null}

      <OTPField code={code} theme={theme} />

      <Text
        style={{
          fontSize: "13px",
          color: theme.mutedForeground,
          lineHeight: "20px",
          margin: 0,
        }}
      >
        <strong style={{ color: theme.foreground }}>
          {resolvedExpiration}
        </strong>{" "}
        {resolvedNotice}
      </Text>
    </EmailLayout>
  );
};
