import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import type { EmailTheme } from '../theme/types.js'

export interface WelcomeEmailProps {
  appName?: string
  userName?: string
  dashboardUrl?: string
  theme: EmailTheme
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  appName = '{{ .AppName }}',
  userName = '{{ .UserName }}',
  dashboardUrl = '{{ .DashboardURL }}',
  theme,
}) => {
  return (
    <EmailLayout
      previewText={`${appName}'a hoş geldiniz!`}
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
        Aramıza Hoş Geldiniz! 🎉
      </Heading>
      <Text
        style={{
          fontSize: '14px',
          color: theme.mutedForeground,
          lineHeight: '22px',
          margin: '0 0 16px',
        }}
      >
        Merhaba {userName}, {appName} ailesine katıldığınız için çok mutluyuz. Hesabınız başarıyla oluşturuldu ve kullanıma hazır.
      </Text>

      <EmailButton href={dashboardUrl} theme={theme}>
        Panele Git ve Başla
      </EmailButton>

      <Text
        style={{
          fontSize: '13px',
          color: theme.mutedForeground,
          lineHeight: '20px',
          margin: '20px 0 0',
        }}
      >
        Herhangi bir sorunuz olursa destek ekibimize dilediğiniz zaman ulaşabilirsiniz. Keyifli kullanımlar dileriz!
      </Text>
    </EmailLayout>
  )
}
