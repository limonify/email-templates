import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { EmailBadge } from '../components/badge.js'
import type { EmailTheme } from '../theme/types.js'

export interface SubscriptionCanceledEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  heading?: string
  description?: string
  planName?: string
  planLabel?: string
  expiryDate?: string
  expiryLabel?: string
  reactivateUrl?: string
  reactivateButtonText?: string
  feedbackText?: string
}

export const SubscriptionCanceledEmail: React.FC<SubscriptionCanceledEmailProps> = ({
  appName = '{{ .AppName }}',
  badgeText = 'Subscription',
  heading = 'Subscription canceled',
  description,
  planName = '{{ .PlanName }}',
  planLabel = 'Previous plan',
  expiryDate = '{{ .ExpiryDate }}',
  expiryLabel = 'Access expires on',
  reactivateUrl = '{{ .ReactivateURL }}',
  reactivateButtonText = 'Reactivate subscription',
  feedbackText,
  theme,
  ...layoutProps
}) => {
  const isDark = theme.background === '#0a0a0a' || theme.background.startsWith('#0')
  const cardBg = isDark ? '#111111' : '#f9f9fb'
  const cardBorder = isDark ? '#222222' : '#ebebeb'

  const resolvedDescription =
    description ||
    `Your subscription for ${planName} has been canceled. Your features and data will remain accessible until the end of your billing cycle.`
  const resolvedFeedback =
    feedbackText || 'We would love to know how we can improve. If you have a moment, please share your thoughts with us.'

  return (
    <EmailLayout
      previewText={`Subscription canceled for ${appName}`}
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

      {/* Plan Summary Box */}
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
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{planLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right', fontWeight: '500' }}>{planName}</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{expiryLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right', fontWeight: '500' }}>{expiryDate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={reactivateUrl} theme={theme}>
        {reactivateButtonText}
      </EmailButton>

      <Text
        style={{
          fontSize: '12px',
          color: theme.mutedForeground,
          lineHeight: '18px',
          margin: '14px 0 0',
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedFeedback}
      </Text>
    </EmailLayout>
  )
}
