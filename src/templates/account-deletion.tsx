import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { EmailBadge } from '../components/badge.js'
import { InfoCard } from '../components/info-card.js'
import type { EmailTheme } from '../theme/types.js'

export interface AccountDeletionEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  heading?: string
  description?: string
  scheduledDate?: string
  scheduledDateLabel?: string
  cancelDeletionUrl?: string
  cancelButtonText?: string
  warningText?: string
}

export const AccountDeletionEmail: React.FC<AccountDeletionEmailProps> = ({
  appName = '{{ .AppName }}',
  badgeText = 'Account alert',
  heading = 'Account deletion scheduled',
  scheduledDate = '{{ .ScheduledDate }}',
  scheduledDateLabel = 'Permanent deletion date',
  cancelDeletionUrl = '{{ .CancelDeletionURL }}',
  cancelButtonText = 'Cancel deletion & keep account',
  warningText,
  description,
  theme,
  ...layoutProps
}) => {
  const isDark = theme.background === '#0a0a0a' || theme.background.startsWith('#0')
  const cardBg = isDark ? '#111111' : '#f9f9fb'
  const cardBorder = isDark ? '#222222' : '#ebebeb'

  const resolvedDescription =
    description ||
    `We have received your request to delete your ${appName} account. Your account has been placed into a 30-day grace period.`
  const resolvedWarning =
    warningText ||
    'After this date, all workspaces, API keys, databases, and associated assets will be wiped permanently and cannot be recovered.'

  return (
    <EmailLayout
      previewText={`Account deletion scheduled for ${appName}`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="error" dot={true} theme={theme}>
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
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{scheduledDateLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: '#ef4444', textAlign: 'right', fontWeight: '600' }}>{scheduledDate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={cancelDeletionUrl} theme={theme}>
        {cancelButtonText}
      </EmailButton>

      <InfoCard title="Important warning" theme={theme}>
        {resolvedWarning}
      </InfoCard>
    </EmailLayout>
  )
}
