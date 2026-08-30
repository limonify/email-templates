import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { InfoCard } from '../components/info-card.js'
import type { EmailTheme } from '../theme/types.js'

export interface PasswordResetEmailProps {
  appName?: string
  userName?: string
  resetUrl?: string
  expiresIn?: string
  theme: EmailTheme
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
  appName = '{{ .AppName }}',
  userName = '{{ .UserName }}',
  resetUrl = '{{ .ResetURL }}',
  expiresIn = '{{ .ExpiresIn }}',
  theme,
}) => {
  return (
    <EmailLayout
      previewText="Şifre sıfırlama talebiniz"
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
        Şifrenizi Sıfırlayın
      </Heading>
      <Text
        style={{
          fontSize: '14px',
          color: theme.mutedForeground,
          lineHeight: '22px',
          margin: '0 0 16px',
        }}
      >
        Merhaba {userName}, hesabınız için bir şifre sıfırlama talebinde bulundunuz. Yeni şifrenizi belirlemek için aşağıdaki butona tıklayın:
      </Text>

      <EmailButton href={resetUrl} theme={theme}>
        Şifremi Sıfırla
      </EmailButton>

      <InfoCard title="Güvenlik Notu" theme={theme}>
        Bu bağlantı <strong>{expiresIn}</strong> içinde geçerliliğini yitirecektir. Şifre sıfırlama talebinde bulunmadıysanız hesabınız güvendedir, bu e-postayı yok sayabilirsiniz.
      </InfoCard>
    </EmailLayout>
  )
}
