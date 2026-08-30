import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { EmailBadge } from '../components/badge.js'
import type { EmailTheme } from '../theme/types.js'

export interface TeamInviteEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  heading?: string
  description?: string
  inviterName?: string
  workspaceName?: string
  role?: string
  roleLabel?: string
  workspaceLabel?: string
  inviteUrl?: string
  buttonText?: string
  declineText?: string
}

export const TeamInviteEmail: React.FC<TeamInviteEmailProps> = ({
  appName = '{{ .AppName }}',
  badgeText = 'Team invite',
  heading,
  description,
  inviterName = '{{ .InviterName }}',
  workspaceName = '{{ .WorkspaceName }}',
  role = '{{ .Role }}',
  roleLabel = 'Assigned role',
  workspaceLabel = 'Workspace',
  inviteUrl = '{{ .InviteURL }}',
  buttonText = 'Accept invitation',
  declineText,
  theme,
  ...layoutProps
}) => {
  const isDark = theme.background === '#0a0a0a' || theme.background.startsWith('#0')
  const cardBg = isDark ? '#111111' : '#f9f9fb'
  const cardBorder = isDark ? '#222222' : '#ebebeb'

  const resolvedHeading = heading || `Join ${workspaceName}`
  const resolvedDescription =
    description ||
    `${inviterName} has invited you to join the ${workspaceName} workspace on ${appName}.`
  const resolvedDecline =
    declineText || 'If you were not expecting this invitation, you can safely ignore this email.'

  return (
    <EmailLayout
      previewText={`${inviterName} invited you to join ${workspaceName}`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="neutral" theme={theme}>
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
        {resolvedHeading}
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

      {/* Workspace Details Grid */}
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
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{workspaceLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right', fontWeight: '500' }}>{workspaceName}</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{roleLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right', fontWeight: '500' }}>{role}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <EmailButton href={inviteUrl} theme={theme}>
        {buttonText}
      </EmailButton>

      <Text
        style={{
          fontSize: '12px',
          color: theme.mutedForeground,
          lineHeight: '18px',
          margin: '12px 0 0',
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedDecline}
      </Text>
    </EmailLayout>
  )
}
