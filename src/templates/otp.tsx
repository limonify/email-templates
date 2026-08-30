import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { OTPField } from '../components/otp-field.js'
import { EmailBadge } from '../components/badge.js'
import type { EmailTheme } from '../theme/types.js'

export interface OTPEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  heading?: string
  description?: string
  code?: string
  expiresIn?: string
  expirationText?: string
  securityNotice?: string
}

export const OTPEmail: React.FC<OTPEmailProps> = ({
  appName = '{{ .AppName }}',
  badgeText = 'Verification code',
  heading = 'Sign in verification',
  description = 'Use the verification code below to complete your sign in request:',
  code = '{{ .Code }}',
  expiresIn = '{{ .ExpiresIn }}',
  expirationText,
  securityNotice,
  theme,
  ...layoutProps
}) => {
  const resolvedExpiration = expirationText || `This code expires in ${expiresIn}.`
  const resolvedNotice =
    securityNotice || 'If you did not request this verification code, you can safely ignore this email.'

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
            fontSize: '18px',
            fontWeight: '600',
            color: theme.foreground,
            margin: '0 0 8px',
            letterSpacing: '-0.025em',
            fontFamily: theme.fontFamily,
          }}
        >
          {heading}
        </Heading>
      ) : null}

      {description ? (
        <Text
          style={{
            fontSize: '13px',
            color: theme.mutedForeground,
            lineHeight: '20px',
            margin: '0 0 12px',
            fontFamily: theme.fontFamily,
          }}
        >
          {description}
        </Text>
      ) : null}

      <OTPField code={code} theme={theme} />

      <Text
        style={{
          fontSize: '12px',
          color: theme.mutedForeground,
          lineHeight: '18px',
          margin: 0,
          fontFamily: theme.fontFamily,
        }}
      >
        <strong style={{ color: theme.foreground, fontWeight: '500' }}>{resolvedExpiration}</strong>{' '}
        {resolvedNotice}
      </Text>
    </EmailLayout>
  )
}
