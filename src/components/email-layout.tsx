import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { EmailTheme } from '../theme/types.js'

export interface EmailLayoutProps {
  previewText?: string
  appName?: string
  logoUrl?: string
  supportUrl?: string
  children: React.ReactNode
  theme: EmailTheme
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({
  previewText,
  appName = 'Limonify',
  logoUrl,
  supportUrl = 'https://limonify.com/support',
  children,
  theme,
}) => {
  return (
    <Html>
      <Head />
      {previewText ? <Preview>{previewText}</Preview> : null}
      <Body
        style={{
          backgroundColor: theme.background,
          fontFamily: theme.fontFamily,
          margin: 0,
          padding: '40px 0',
        }}
      >
        <Container
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            padding: '0 20px',
          }}
        >
          {/* Header Branding */}
          <Section style={{ marginBottom: '24px', textAlign: 'center' }}>
            {logoUrl ? (
              <Img
                src={logoUrl}
                alt={appName}
                width="40"
                height="40"
                style={{ margin: '0 auto', borderRadius: theme.radius }}
              />
            ) : (
              <Text
                style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: theme.foreground,
                  margin: 0,
                  letterSpacing: '-0.025em',
                }}
              >
                {appName}
              </Text>
            )}
          </Section>

          {/* Main Card Content */}
          <Section
            style={{
              backgroundColor: theme.surface,
              borderRadius: theme.radius,
              border: `1px solid ${theme.surfaceBorder}`,
              padding: '36px 32px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            }}
          >
            {children}
          </Section>

          {/* Footer */}
          <Section style={{ marginTop: '32px', textAlign: 'center' }}>
            <Text
              style={{
                fontSize: '12px',
                color: theme.mutedForeground,
                lineHeight: '18px',
                margin: '0 0 8px',
              }}
            >
              Sorularınız mı var?{' '}
              <Link
                href={supportUrl}
                style={{ color: theme.primary, textDecoration: 'underline' }}
              >
                Destek ekibimizle iletişime geçin
              </Link>
            </Text>
            <Text
              style={{
                fontSize: '12px',
                color: theme.mutedForeground,
                margin: 0,
              }}
            >
              © {new Date().getFullYear()} {appName}. Tüm hakları saklıdır.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
