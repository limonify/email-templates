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
  slotWidth?: string | number;
  slotHeight?: string | number;
  digitSize?: string;
  slotSpacing?: string | number;
  slotRadius?: string;
}

export const OTPEmail: React.FC<OTPEmailProps> = ({
  appName = "{{ .AppName }}",
  badgeText = "Verification code",
  heading = "Sign in verification",
  description = "Use the verification code below to complete your sign in request:",
  code = "{{ .Code }}",
  expiresIn = "{{ .ExpiresIn }}",
  expirationText,
  securityNotice,
  headingSize,
  headingWeight,
  headingLetterSpacing,
  bodySize,
  bodyLineHeight,
  slotWidth,
  slotHeight,
  digitSize,
  slotSpacing,
  slotRadius,
  theme,
  ...layoutProps
}) => {
  const resolvedExpiration =
    expirationText || `This code expires in ${expiresIn}.`;
  const resolvedNotice =
    securityNotice ||
    "If you did not request this verification code, you can safely ignore this email.";

  const resolvedHeadingSize = headingSize || theme.headingSize || "18px";
  const resolvedHeadingWeight = (headingWeight ||
    theme.headingWeight ||
    "600") as any;
  const resolvedHeadingSpacing =
    headingLetterSpacing || theme.headingLetterSpacing || "-0.025em";
  const resolvedBodySize = bodySize || theme.bodySize || "13px";
  const resolvedBodyLineHeight =
    bodyLineHeight || theme.bodyLineHeight || "20px";

  return (
    <EmailLayout
      previewText={`Verification code: ${code}`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="neutral" theme={theme}>
        {badgeText}
      </EmailBadge>

      {heading ? (
        <Heading
          style={{
            fontSize: resolvedHeadingSize,
            fontWeight: resolvedHeadingWeight,
            color: theme.foreground,
            margin: "0 0 8px",
            letterSpacing: resolvedHeadingSpacing,
            fontFamily: theme.fontFamily,
          }}
        >
          {heading}
        </Heading>
      ) : null}

      {description ? (
        <Text
          style={{
            fontSize: resolvedBodySize,
            color: theme.mutedForeground,
            lineHeight: resolvedBodyLineHeight,
            margin: "0 0 12px",
            fontFamily: theme.fontFamily,
          }}
        >
          {description}
        </Text>
      ) : null}

      <OTPField
        code={code}
        slotWidth={slotWidth}
        slotHeight={slotHeight}
        digitSize={digitSize}
        slotSpacing={slotSpacing}
        slotRadius={slotRadius}
        theme={theme}
      />

      <Text
        style={{
          fontSize: "12px",
          color: theme.mutedForeground,
          lineHeight: "18px",
          margin: 0,
          fontFamily: theme.fontFamily,
        }}
      >
        <strong style={{ color: theme.foreground, fontWeight: "500" }}>
          {resolvedExpiration}
        </strong>{" "}
        {resolvedNotice}
      </Text>
    </EmailLayout>
  );
};
