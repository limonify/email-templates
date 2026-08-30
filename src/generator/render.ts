import * as React from 'react'
import { render } from '@react-email/render'
import type { EmailTheme, TemplateEngine } from '../theme/types.js'
import { adaptVariables } from './adapters.js'

import { OTPEmail } from '../templates/otp.js'
import { PasswordResetEmail } from '../templates/password-reset.js'
import { WelcomeEmail } from '../templates/welcome.js'
import { NotificationEmail } from '../templates/notification.js'
import { PaymentCompletedEmail } from '../templates/payment-completed.js'
import { MagicLinkEmail } from '../templates/magic-link.js'

export type TemplateId =
  | 'otp'
  | 'password-reset'
  | 'welcome'
  | 'notification'
  | 'payment-completed'
  | 'magic-link'

export interface TemplateMetadata {
  id: TemplateId
  name: string
  description: string
  filename: string
  component: (props: { theme: EmailTheme }) => React.ReactElement
}

export const TEMPLATES_REGISTRY: Record<TemplateId, TemplateMetadata> = {
  otp: {
    id: 'otp',
    name: 'OTP / Doğrulama Kodu',
    description: '2FA ve tek kullanımlık e-posta onay kodu şablonu',
    filename: 'otp.html',
    component: (props) => React.createElement(OTPEmail, props),
  },
  'password-reset': {
    id: 'password-reset',
    name: 'Şifre Sıfırlama (Password Reset)',
    description: 'Şifremi unuttum ve sıfırlama butonu şablonu',
    filename: 'password-reset.html',
    component: (props) => React.createElement(PasswordResetEmail, props),
  },
  welcome: {
    id: 'welcome',
    name: 'Hoş Geldiniz (Welcome / Onboarding)',
    description: 'Yeni kayıt olan kullanıcılara karşılama şablonu',
    filename: 'welcome.html',
    component: (props) => React.createElement(WelcomeEmail, props),
  },
  notification: {
    id: 'notification',
    name: 'Hesap Bildirimi (Notification / Alert)',
    description: 'Sistem uyarıları, güvenlik ve hesap bilgilendirme şablonu',
    filename: 'notification.html',
    component: (props) => React.createElement(NotificationEmail, props),
  },
  'payment-completed': {
    id: 'payment-completed',
    name: 'Ödeme Onayı & Fatura (Payment Receipt)',
    description: 'Sipariş özeti ve fatura indirme şablonu',
    filename: 'payment-completed.html',
    component: (props) => React.createElement(PaymentCompletedEmail, props),
  },
  'magic-link': {
    id: 'magic-link',
    name: 'Sihirli Bağlantı (Magic Link Login)',
    description: 'Şifresiz doğrudan tek tıkla giriş şablonu',
    filename: 'magic-link.html',
    component: (props) => React.createElement(MagicLinkEmail, props),
  },
}

export async function renderTemplateToHtml(
  templateId: TemplateId,
  theme: EmailTheme,
  engine: TemplateEngine = 'go'
): Promise<string> {
  const meta = TEMPLATES_REGISTRY[templateId]
  if (!meta) {
    throw new Error(`Bilinmeyen şablon ID: ${templateId}`)
  }

  const rawHtml = await render(meta.component({ theme }), { pretty: true })
  return adaptVariables(rawHtml, engine)
}
