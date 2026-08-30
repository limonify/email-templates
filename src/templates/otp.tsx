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
      theme={theme}
    >
      <Heading
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: theme.foreground,
          margin: "0 0 12px",
          letterSpacing: "-0.02em",
        }}
      >
        Verification Code
      </Heading>
      <Text
        style={{
          fontSize: "14px",
          color: theme.mutedForeground,
          lineHeight: "22px",
          margin: "0 0 16px",
        }}
      >
        Please use the following one-time verification code to securely sign in
        or complete your request:
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
        This code expires in{" "}
        <strong style={{ color: theme.foreground }}>{expiresIn}</strong>. If you
        did not request this code, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
};
