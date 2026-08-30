import * as React from 'react'
import { Button as ReactEmailButton } from '@react-email/components'
import type { EmailTheme } from '../theme/types.js'

export interface EmailButtonProps {
  href: string
  children: React.ReactNode
  theme: EmailTheme
  align?: 'left' | 'center' | 'right'
}

export const EmailButton: React.FC<EmailButtonProps> = ({
  href,
  children,
  theme,
  align = 'center',
}) => {
  return (
    <div style={{ textAlign: align, margin: '24px 0' }}>
      <ReactEmailButton
        href={href}
        style={{
          backgroundColor: theme.primary,
          color: theme.primaryForeground,
          borderRadius: theme.radius,
          padding: '12px 28px',
          fontWeight: '600',
          fontSize: '14px',
          textDecoration: 'none',
          display: 'inline-block',
          textAlign: 'center',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {children}
      </ReactEmailButton>
    </div>
  )
}
