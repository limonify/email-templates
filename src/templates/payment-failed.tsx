import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { EmailBadge } from '../components/badge.js'
import { InfoCard } from '../components/info-card.js'
import type { EmailTheme } from '../theme/types.js'

export interface PaymentFailedEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  heading?: string
  description?: string
  amount?: string
  amountLabel?: string
  planName?: string
  retryDate?: string
  retryDateLabel?: string
  updateBillingUrl?: string
  buttonText?: string
  noticeText?: string
}

export const PaymentFailedEmail: React.FC<PaymentFailedEmailProps> = ({
  appName = '{{ .AppName }}',
  badgeText = 'Payment failed',
  heading = 'Payment unsuccessful',
  description,
  amount = '{{ .Amount }}',
  amountLabel = 'Amount due',
  planName = '{{ .PlanName }}',
  retryDate = '{{ .RetryDate }}',
  retryDateLabel = 'Next retry attempt',
  updateBillingUrl = '{{ .UpdateBillingURL }}',
  buttonText = 'Update payment method',
  noticeText,
  theme,
  ...layoutProps
}) => {
  const isDark = theme.background === '#0a0a0a' || theme.background.startsWith('#0')
  const cardBg = isDark ? '#111111' : '#f9f9fb'
  const cardBorder = isDark ? '#222222' : '#ebebeb'

  const resolvedDescription =
    description ||
    `We were unable to process your payment of ${amount} for ${planName}. Please update your payment details to maintain uninterrupted access.`
  const resolvedNotice =
    noticeText || 'If your payment details are not updated, your workspace access may be temporarily suspended.'

  return (
    <EmailLayout
      previewText={`Payment failed for ${appName} subscription`}
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

      {/* Payment details */}
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
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{amountLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right', fontWeight: '600' }}>{amount}</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{retryDateLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right' }}>{retryDate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={updateBillingUrl} theme={theme}>
        {buttonText}
      </EmailButton>

      <InfoCard title="Notice" theme={theme}>
        {resolvedNotice}
      </InfoCard>
    </EmailLayout>
  )
}
