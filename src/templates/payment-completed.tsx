import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import type { EmailTheme } from '../theme/types.js'

export interface PaymentCompletedEmailProps {
  appName?: string
  userName?: string
  orderId?: string
  amount?: string
  receiptUrl?: string
  planName?: string
  date?: string
  theme: EmailTheme
}

export const PaymentCompletedEmail: React.FC<PaymentCompletedEmailProps> = ({
  appName = '{{ .AppName }}',
  userName = '{{ .UserName }}',
  orderId = '{{ .OrderID }}',
  amount = '{{ .Amount }}',
  receiptUrl = '{{ .ReceiptURL }}',
  planName = '{{ .PlanName }}',
  date = '{{ .Date }}',
  theme,
}) => {
  return (
    <EmailLayout
      previewText={`Ödemeniz alındı (${orderId})`}
      appName={appName}
      theme={theme}
    >
      <Heading
        style={{
          fontSize: '22px',
          fontWeight: '700',
          color: theme.foreground,
          margin: '0 0 12px',
          letterSpacing: '-0.02em',
        }}
      >
        Ödemeniz Başarıyla Alındı ✅
      </Heading>
      <Text
        style={{
          fontSize: '14px',
          color: theme.mutedForeground,
          lineHeight: '22px',
          margin: '0 0 20px',
        }}
      >
        Merhaba {userName}, <strong>{planName}</strong> için ödemeniz başarıyla gerçekleşmiştir.
      </Text>

      {/* Invoice Details Table */}
      <div
        style={{
          backgroundColor: theme.background,
          borderRadius: theme.radius,
          border: `1px solid ${theme.surfaceBorder}`,
          padding: '16px 20px',
          margin: '16px 0 24px',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '6px 0', fontSize: '13px', color: theme.mutedForeground }}>Sipariş No:</td>
              <td style={{ padding: '6px 0', fontSize: '13px', color: theme.foreground, textAlign: 'right', fontWeight: '600' }}>{orderId}</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 0', fontSize: '13px', color: theme.mutedForeground }}>Tarih:</td>
              <td style={{ padding: '6px 0', fontSize: '13px', color: theme.foreground, textAlign: 'right' }}>{date}</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 0', fontSize: '13px', color: theme.mutedForeground }}>Plan / Ürün:</td>
              <td style={{ padding: '6px 0', fontSize: '13px', color: theme.foreground, textAlign: 'right' }}>{planName}</td>
            </tr>
            <tr style={{ borderTop: `1px solid ${theme.surfaceBorder}` }}>
              <td style={{ padding: '10px 0 4px', fontSize: '14px', color: theme.foreground, fontWeight: '700' }}>Toplam Tutar:</td>
              <td style={{ padding: '10px 0 4px', fontSize: '16px', color: theme.primary, textAlign: 'right', fontWeight: '700' }}>{amount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={receiptUrl} theme={theme}>
        Faturayı / Makbuzu İndir
      </EmailButton>
    </EmailLayout>
  )
}
