import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { EmailBadge } from '../components/badge.js'
import { InfoCard } from '../components/info-card.js'
import type { EmailTheme } from '../theme/types.js'

export interface EmailChangeEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  heading?: string
  description?: string
  newEmail?: string
  confirmUrl?: string
  buttonText?: string
  securityNotice?: string
}

export const EmailChangeEmail: React.FC<EmailChangeEmailProps> = ({
  appName = '{{ .AppName }}',
  badgeText = 'Email update',
  heading = 'Confirm your new email address',
  newEmail = '{{ .NewEmail }}',
  confirmUrl = '{{ .ConfirmURL }}',
  buttonText = 'Confirm email change',
  securityNotice,
  description,
  theme,
  ...layoutProps
}) => {
  const resolvedDescription =
    description ||
    `We received a request to update the primary email address on your ${appName} account to ${newEmail}. Click below to confirm this change:`
  const resolvedNotice =
    securityNotice ||
    'If you did not request this email change, you can safely ignore this email. Your current address will remain unchanged.'

  return (
    <EmailLayout
      previewText={`Confirm email change for ${appName}`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="warning" dot={true} theme={theme}>
        {badgeText}
      </EmailBadge>

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

      <Text
        style={{
          fontSize: '13px',
          color: theme.mutedForeground,
          lineHeight: '20px',
          margin: '0 0 16px',
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedDescription}
      </Text>

      <EmailButton href={confirmUrl} theme={theme}>
        {buttonText}
      </EmailButton>

      <InfoCard title="Security note" theme={theme}>
        {resolvedNotice}
      </InfoCard>
    </EmailLayout>
  )
}
