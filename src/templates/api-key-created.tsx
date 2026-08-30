import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { EmailBadge } from '../components/badge.js'
import { InfoCard } from '../components/info-card.js'
import type { EmailTheme } from '../theme/types.js'

export interface ApiKeyCreatedEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  heading?: string
  description?: string
  keyName?: string
  keyNameLabel?: string
  keyPrefix?: string
  keyPrefixLabel?: string
  createdAt?: string
  createdLabel?: string
  manageUrl?: string
  revokeButtonText?: string
  securityNotice?: string
}

export const ApiKeyCreatedEmail: React.FC<ApiKeyCreatedEmailProps> = ({
  appName = '{{ .AppName }}',
  badgeText = 'Security',
  heading = 'New API token created',
  description = 'A new API token was generated on your account. If you did not create this token, revoke it immediately.',
  keyName = '{{ .KeyName }}',
  keyNameLabel = 'Token name',
  keyPrefix = '{{ .KeyPrefix }}',
  keyPrefixLabel = 'Token prefix',
  createdAt = '{{ .CreatedAt }}',
  createdLabel = 'Created at',
  manageUrl = '{{ .ManageURL }}',
  revokeButtonText = 'Manage API tokens',
  securityNotice,
  theme,
  ...layoutProps
}) => {
  const isDark = theme.background === '#0a0a0a' || theme.background.startsWith('#0')
  const cardBg = isDark ? '#111111' : '#f9f9fb'
  const cardBorder = isDark ? '#222222' : '#ebebeb'

  const resolvedNotice =
    securityNotice || 'Never share your API keys or commit them to public repositories.'

  return (
    <EmailLayout
      previewText={`New API token created on ${appName}`}
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
        {description}
      </Text>

      {/* Token Details Grid */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '8px',
          border: `1px solid ${cardBorder}`,
          padding: '14px 16px',
          margin: '16px 0 20px',
          fontFamily: theme.fontFamily,
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{keyNameLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right', fontWeight: '500' }}>{keyName}</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{keyPrefixLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right', fontFamily: 'ui-monospace, monospace' }}>{keyPrefix}</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{createdLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right' }}>{createdAt}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={manageUrl} theme={theme}>
        {revokeButtonText}
      </EmailButton>

      <InfoCard title="Security note" theme={theme}>
        {resolvedNotice}
      </InfoCard>
    </EmailLayout>
  )
}
