import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { EmailBadge } from '../components/badge.js'
import type { EmailTheme } from '../theme/types.js'

export interface MetricItem {
  label: string
  value: string
  change?: string
  positive?: boolean
}

export interface WeeklyDigestEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  heading?: string
  description?: string
  analyticsUrl?: string
  buttonText?: string
  metrics?: MetricItem[]
}

export const WeeklyDigestEmail: React.FC<WeeklyDigestEmailProps> = ({
  appName = '{{ .AppName }}',
  badgeText = 'Weekly digest',
  heading = 'Your weekly summary',
  description = 'Here is a breakdown of your workspace performance over the past 7 days:',
  analyticsUrl = '{{ .AnalyticsURL }}',
  buttonText = 'Open analytics dashboard',
  metrics,
  theme,
  ...layoutProps
}) => {
  const isDark = theme.background === '#0a0a0a' || theme.background.startsWith('#0')
  const cardBg = isDark ? '#111111' : '#f9f9fb'
  const cardBorder = isDark ? '#222222' : '#ebebeb'

  const defaultMetrics: MetricItem[] = [
    { label: 'API Requests', value: '148,290', change: '+18.4%', positive: true },
    { label: 'Avg Latency', value: '42ms', change: '-4ms', positive: true },
    { label: 'Uptime', value: '99.99%', change: 'Stable', positive: true },
    { label: 'Active Users', value: '1,840', change: '+12%', positive: true },
  ]

  const resolvedMetrics = metrics || defaultMetrics

  return (
    <EmailLayout
      previewText={`Weekly report for ${appName}`}
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
        {heading}
      </Heading>

      <Text
        style={{
          fontSize: '13px',
          color: theme.mutedForeground,
          lineHeight: '20px',
          margin: '0 0 18px',
          fontFamily: theme.fontFamily,
        }}
      >
        {description}
      </Text>

      {/* Metrics Grid 2x2 */}
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '8px', margin: '14px 0 20px', fontFamily: theme.fontFamily }}>
        <tbody>
          <tr>
            {resolvedMetrics.slice(0, 2).map((m, idx) => (
              <td
                key={idx}
                style={{
                  width: '50%',
                  backgroundColor: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: '8px',
                  padding: '12px 14px',
                  verticalAlign: 'top',
                }}
              >
                <div style={{ fontSize: '11px', color: theme.mutedForeground, marginBottom: '4px' }}>{m.label}</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: theme.foreground, letterSpacing: '-0.02em' }}>{m.value}</div>
                {m.change ? (
                  <div style={{ fontSize: '11px', color: '#22c55e', marginTop: '2px' }}>{m.change}</div>
                ) : null}
              </td>
            ))}
          </tr>
          <tr>
            {resolvedMetrics.slice(2, 4).map((m, idx) => (
              <td
                key={idx}
                style={{
                  width: '50%',
                  backgroundColor: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: '8px',
                  padding: '12px 14px',
                  verticalAlign: 'top',
                }}
              >
                <div style={{ fontSize: '11px', color: theme.mutedForeground, marginBottom: '4px' }}>{m.label}</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: theme.foreground, letterSpacing: '-0.02em' }}>{m.value}</div>
                {m.change ? (
                  <div style={{ fontSize: '11px', color: '#22c55e', marginTop: '2px' }}>{m.change}</div>
                ) : null}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <EmailButton href={analyticsUrl} theme={theme}>
        {buttonText}
      </EmailButton>
    </EmailLayout>
  )
}
