import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { EmailBadge } from '../components/badge.js'
import type { EmailTheme } from '../theme/types.js'

export interface DeploySucceededEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  heading?: string
  description?: string
  projectName?: string
  branch?: string
  branchLabel?: string
  commitHash?: string
  commitLabel?: string
  commitMessage?: string
  duration?: string
  durationLabel?: string
  deployUrl?: string
  buttonText?: string
}

export const DeploySucceededEmail: React.FC<DeploySucceededEmailProps> = ({
  appName = '{{ .AppName }}',
  badgeText = 'Deployed',
  heading = 'Production deployment successful',
  projectName = '{{ .ProjectName }}',
  branch = 'main',
  branchLabel = 'Branch',
  commitHash = '8af2614',
  commitLabel = 'Commit',
  commitMessage = 'feat: integrate design system tokens v2',
  duration = '38s',
  durationLabel = 'Build time',
  deployUrl = '{{ .DeployURL }}',
  buttonText = 'View deployment',
  description,
  theme,
  ...layoutProps
}) => {
  const isDark = theme.background === '#0a0a0a' || theme.background.startsWith('#0')
  const cardBg = isDark ? '#111111' : '#f9f9fb'
  const cardBorder = isDark ? '#222222' : '#ebebeb'

  const resolvedDescription =
    description || `Your project ${projectName} was successfully built and deployed to production.`

  return (
    <EmailLayout
      previewText={`Deployment succeeded for ${projectName}`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="success" dot={true} theme={theme}>
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

      {/* Deployment summary card */}
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
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{branchLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right', fontFamily: 'ui-monospace, monospace' }}>{branch}</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{commitLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right', fontFamily: 'ui-monospace, monospace' }}>{commitHash}</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.mutedForeground }}>{durationLabel}</td>
              <td style={{ padding: '4px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right', fontWeight: '500' }}>{duration}</td>
            </tr>
          </tbody>
        </table>
        {commitMessage ? (
          <div style={{ borderTop: `1px solid ${isDark ? '#1f1f1f' : '#f0f0f0'}`, marginTop: '10px', paddingTop: '10px', fontSize: '12px', color: theme.mutedForeground }}>
            "{commitMessage}"
          </div>
        ) : null}
      </div>

      <EmailButton href={deployUrl} theme={theme}>
        {buttonText}
      </EmailButton>
    </EmailLayout>
  )
}
