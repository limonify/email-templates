import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { EmailBadge } from '../components/badge.js'
import { InfoCard } from '../components/info-card.js'
import type { EmailTheme } from '../theme/types.js'

export interface MagicLinkEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  heading?: string
  description?: string
  loginUrl?: string
  buttonText?: string
  expiresIn?: string
  securityNoticeTitle?: string
  securityNoticeText?: string
}

export const MagicLinkEmail: React.FC<MagicLinkEmailProps> = ({
  appName = '{{ .AppName }}',
  badgeText = 'Sign in',
  heading,
  description,
  loginUrl = '{{ .LoginURL }}',
  buttonText = 'Sign in to account',
  expiresIn = '{{ .ExpiresIn }}',
  securityNoticeTitle = 'Security note',
  securityNoticeText,
  theme,
  ...layoutProps
}) => {
  const resolvedHeading = heading || `Sign in to ${appName}`
  const resolvedDescription =
    description || `Click the button below to securely sign in to your ${appName} account:`
  const resolvedNotice =
    securityNoticeText ||
    `This single-use link will expire in ${expiresIn}. If you did not request this email, you can safely ignore it.`

  return (
    <EmailLayout
      previewText={`Sign in link for ${appName}`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="neutral" theme={theme}>
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
        {resolvedHeading}
      </Heading>

      <Text
        style={{
          fontSize: '13px',
          color: theme.mutedForeground,
          lineHeight: '20px',
          margin: '0 0 12px',
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedDescription}
      </Text>

      <EmailButton href={loginUrl} theme={theme}>
        {buttonText}
      </EmailButton>

      <InfoCard title={securityNoticeTitle} theme={theme}>
        {resolvedNotice}
      </InfoCard>
    </EmailLayout>
  )
}
