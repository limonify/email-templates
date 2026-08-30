import * as React from 'react'
import { Heading, Text } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { EmailButton } from '../components/button.js'
import { EmailBadge } from '../components/badge.js'
import type { EmailTheme } from '../theme/types.js'

export interface DeployFailedEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  heading?: string
  description?: string
  projectName?: string
  branch?: string
  branchLabel?: string
  commitHash?: string
  commitLabel?: string
  exitStatus?: string
  errorLabel?: string
  errorSnippet?: string
  logsUrl?: string
  buttonText?: string
}

export const DeployFailedEmail: React.FC<DeployFailedEmailProps> = ({
  appName = '{{ .AppName }}',
  badgeText = 'Build failed',
  heading = 'Deployment build failed',
  projectName = '{{ .ProjectName }}',
  branch = 'main',
  branchLabel = 'Branch',
  commitHash = 'f1ddcd3',
  commitLabel = 'Commit',
  exitStatus = 'Command failed with exit code 1 (tsc)',
  errorLabel = 'Build exit status',
  errorSnippet = "error TS2322: Type 'string' is not assignable to type 'number'.\n  src/components/table.tsx:42:15",
  logsUrl = '{{ .LogsURL }}',
  buttonText = 'Inspect build logs',
  description,
  theme,
  ...layoutProps
}) => {
  const isDark = theme.background === '#0a0a0a' || theme.background.startsWith('#0')
  const cardBg = isDark ? '#111111' : '#f9f9fb'
  const cardBorder = isDark ? '#222222' : '#ebebeb'

  const resolvedDescription =
    description ||
    `Deployment failed during the build phase for ${projectName} on branch ${branch}.`

  return (
    <EmailLayout
      previewText={`Build failed for ${projectName}`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <EmailBadge variant="error" dot={true} theme={theme}>
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

      {/* Build error box */}
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
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '3px 0', fontSize: '12px', color: theme.mutedForeground }}>{branchLabel}</td>
              <td style={{ padding: '3px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right', fontFamily: 'ui-monospace, monospace' }}>{branch}</td>
            </tr>
            <tr>
              <td style={{ padding: '3px 0', fontSize: '12px', color: theme.mutedForeground }}>{commitLabel}</td>
              <td style={{ padding: '3px 0', fontSize: '12px', color: theme.foreground, textAlign: 'right', fontFamily: 'ui-monospace, monospace' }}>{commitHash}</td>
            </tr>
            <tr>
              <td style={{ padding: '3px 0', fontSize: '12px', color: theme.mutedForeground }}>{errorLabel}</td>
              <td style={{ padding: '3px 0', fontSize: '12px', color: '#ef4444', textAlign: 'right', fontWeight: '500' }}>{exitStatus}</td>
            </tr>
          </tbody>
        </table>

        {errorSnippet ? (
          <div
            style={{
              backgroundColor: isDark ? '#000000' : '#ffffff',
              border: `1px solid ${isDark ? '#262626' : '#e4e4e7'}`,
              borderRadius: '6px',
              padding: '10px 12px',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '11px',
              lineHeight: '16px',
              color: '#ef4444',
              whiteSpace: 'pre-wrap',
            }}
          >
            {errorSnippet}
          </div>
        ) : null}
      </div>

      <EmailButton href={logsUrl} theme={theme}>
        {buttonText}
      </EmailButton>
    </EmailLayout>
  )
}
