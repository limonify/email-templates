import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { EmailBadge } from '../components/badge.js'
import type { EmailTheme } from '../theme/types.js'

export interface UsageLimitWarningEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  heading?: string
  description?: string
  metricName?: string
  usagePercent?: string
  currentUsage?: string
  usageLabel?: string
  monthlyLimit?: string
  limitLabel?: string
  resetDate?: string
  resetDateLabel?: string
  upgradeUrl?: string
  upgradeButtonText?: string
}

export const UsageLimitWarningEmail: React.FC<UsageLimitWarningEmailProps> = ({
  appName = '{{ .AppName }}',
  badgeText = 'Usage alert',
  heading = 'Quota limit alert',
  metricName = '{{ .MetricName }}',
  usagePercent = '85%',
  currentUsage = '{{ .CurrentUsage }}',
  usageLabel = 'Current usage',
  monthlyLimit = '{{ .MonthlyLimit }}',
  limitLabel = 'Monthly quota',
  resetDate = '{{ .ResetDate }}',
  resetDateLabel = 'Quota resets on',
  upgradeUrl = '{{ .UpgradeURL }}',
  upgradeButtonText = 'Upgrade plan',
  description,
  theme,
  ...layoutProps
}) => {
  const isDark = theme.background === '#0a0a0a' || theme.background.startsWith('#0')
  const cardBg = isDark ? '#111111' : '#f9f9fb'
  const cardBorder = isDark ? '#222222' : '#ebebeb'

  const resolvedDescription =
    description ||
    `You have reached ${usagePercent} of your monthly ${metricName} quota on ${appName}.`

  return (
    <EmailLayout
      previewText={`Quota limit warning on ${appName}`}
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

      {/* Usage Progress Box */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: theme.mutedForeground }}>{metricName}</span>
          <span style={{ fontSize: '12px', fontWeight: '600', color: theme.foreground }}>{usagePercent}</span>
        </div>

        {/* Meter bar */}
        <div
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '3px',
            backgroundColor: isDark ? '#262626' : '#e4e4e7',
            overflow: 'hidden',
            margin: '6px 0 12px',
          }}
        >
          <div
            style={{
              width: usagePercent.includes('%') ? usagePercent : `${usagePercent}%`,
              height: '100%',
              backgroundColor: isDark ? '#facc15' : '#ca8a04',
              borderRadius: '3px',
            }}
          />
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '3px 0', fontSize: '12px', color: theme.mutedForeground }}>{usageLabel}</td>
              <td style={{ padding: '3px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right' }}>{currentUsage}</td>
            </tr>
            <tr>
              <td style={{ padding: '3px 0', fontSize: '12px', color: theme.mutedForeground }}>{limitLabel}</td>
              <td style={{ padding: '3px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right' }}>{monthlyLimit}</td>
            </tr>
            <tr>
              <td style={{ padding: '3px 0', fontSize: '12px', color: theme.mutedForeground }}>{resetDateLabel}</td>
              <td style={{ padding: '3px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right' }}>{resetDate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={upgradeUrl} theme={theme}>
        {upgradeButtonText}
      </EmailButton>
    </EmailLayout>
  )
}
