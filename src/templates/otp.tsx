import * as React from "react";
import { Heading, Text } from "@react-email/components";
import { EmailLayout } from "../components/email-layout.js";
import { CodeBox } from "../components/code-box.js";
import type { EmailTheme } from "../theme/types.js";

export interface OTPEmailProps {
  appName?: string;
  code?: string;
  expiresIn?: string;
  theme: EmailTheme;
}

export const OTPEmail: React.FC<OTPEmailProps> = ({
  appName = "{{ .AppName }}",
  code = "{{ .Code }}",
  expiresIn = "{{ .ExpiresIn }}",
  theme,
}) => {
  return (
    <EmailLayout
      previewText={`Your verification code: ${code}`}
      appName={appName}
      badgeText="Security Verification"
      theme={theme}
    >
      <Heading
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: theme.foreground,
          margin: "0 0 10px",
          letterSpacing: "-0.025em",
        }}
      >
        Sign In Verification Code
      </Heading>
      <Text
        style={{
          fontSize: "14px",
          color: theme.mutedForeground,
          lineHeight: "22px",
          margin: "0 0 16px",
        }}
      >
        Please use the one-time verification code below to securely authenticate
        your session:
      </Text>

      <CodeBox code={code} theme={theme} />

      <Text
        style={{
          fontSize: "13px",
          color: theme.mutedForeground,
          lineHeight: "20px",
          margin: 0,
        }}
      >
        This code is valid for{" "}
        <strong style={{ color: theme.foreground }}>{expiresIn}</strong>. If you
        didn't initiate this request, no action is required and you can safely
        disregard this message.
      </Text>
    </EmailLayout>
  );
};
