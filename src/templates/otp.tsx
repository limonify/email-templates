import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout } from '../components/email-layout.js'
import { CodeBox } from '../components/code-box.js'
import type { EmailTheme } from '../theme/types.js'

export interface OTPEmailProps {
  appName?: string
  code?: string
  expiresIn?: string
  theme: EmailTheme
}

export const OTPEmail: React.FC<OTPEmailProps> = ({
  appName = '{{ .AppName }}',
  code = '{{ .Code }}',
  expiresIn = '{{ .ExpiresIn }}',
  theme,
}) => {
  return (
    <EmailLayout
      previewText={`Doğrulama kodunuz: ${code}`}
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
        Giriş Doğrulama Kodu
      </Heading>
      <Text
        style={{
          fontSize: '14px',
          color: theme.mutedForeground,
          lineHeight: '22px',
          margin: '0 0 16px',
        }}
      >
        Hesabınıza giriş yapabilmek veya işleminizi tamamlamak için aşağıdaki tek kullanımlık güvenlik kodunu girin:
      </Text>

      <CodeBox code={code} theme={theme} />

      <Text
        style={{
          fontSize: '13px',
          color: theme.mutedForeground,
          lineHeight: '20px',
          margin: 0,
        }}
      >
        Bu kod <strong style={{ color: theme.foreground }}>{expiresIn}</strong> süreyle geçerlidir. Bu işlemi siz başlatmadıysanız lütfen bu e-postayı dikkate almayın.
      </Text>
    </EmailLayout>
  )
}
