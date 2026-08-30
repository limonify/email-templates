import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { InfoCard } from '../components/info-card.js'
import type { EmailTheme } from '../theme/types.js'

export interface MagicLinkEmailProps {
  appName?: string
  loginUrl?: string
  expiresIn?: string
  theme: EmailTheme
}

export const MagicLinkEmail: React.FC<MagicLinkEmailProps> = ({
  appName = '{{ .AppName }}',
  loginUrl = '{{ .LoginURL }}',
  expiresIn = '{{ .ExpiresIn }}',
  theme,
}) => {
  return (
    <EmailLayout
      previewText={`${appName} giriş bağlantınız`}
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
        Giriş Bağlantınız
      </Heading>
      <Text
        style={{
          fontSize: '14px',
          color: theme.mutedForeground,
          lineHeight: '22px',
          margin: '0 0 16px',
        }}
      >
        {appName} hesabınıza şifresiz olarak giriş yapmak için aşağıdaki butona tıklayın:
      </Text>

      <EmailButton href={loginUrl} theme={theme}>
        Hesabıma Giriş Yap
      </EmailButton>

      <InfoCard title="Güvenlik Notu" theme={theme}>
        Bu bağlantı <strong>{expiresIn}</strong> süreyle geçerlidir ve yalnızca tek bir giriş için kullanılabilir.
      </InfoCard>
    </EmailLayout>
  )
}
