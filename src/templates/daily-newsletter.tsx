import * as React from 'react'
import { Heading, Text, Link } from '@react-email/components'
import { EmailLayout, type EmailLayoutProps } from '../components/email-layout.js'
import { EmailBadge } from '../components/badge.js'
import type { EmailTheme } from '../theme/types.js'

export interface NewsItem {
  title: string
  snippet: string
  url: string
  tag?: string
  readTime?: string
}

export interface DailyNewsletterEmailProps extends Partial<Omit<EmailLayoutProps, 'children' | 'theme'>> {
  theme: EmailTheme
  issueNumber?: string
  date?: string
  heading?: string
  description?: string
  topStory?: NewsItem
  topStoryLabel?: string
  readMoreText?: string
  curatedLabel?: string
  curatedItems?: NewsItem[]
  footerNote?: string
}

export const DailyNewsletterEmail: React.FC<DailyNewsletterEmailProps> = ({
  appName = 'Limonify Daily',
  badgeText = 'Daily Briefing',
  issueNumber = '#142',
  date = 'Monday, August 31, 2026',
  heading = 'Daily Tech & Architecture Briefing',
  description = 'Your morning curated digest of software architecture, engineering breakthroughs, and open-source releases.',
  topStoryLabel = 'Top Story',
  readMoreText = 'Read article',
  curatedLabel = 'Curated Highlights',
  topStory,
  curatedItems,
  footerNote,
  theme,
  ...layoutProps
}) => {
  const isDark = theme.background === '#0a0a0a' || theme.background.startsWith('#0')
  const cardBg = isDark ? '#111111' : '#f9f9fb'
  const cardBorder = isDark ? '#222222' : '#ebebeb'
  const dividerBorder = isDark ? '#1f1f1f' : '#f0f0f0'

  const defaultTopStory: NewsItem = {
    title: 'Designing High-Throughput Distributed Microfrontends with React 19',
    snippet:
      'A deep dive into zero-runtime layout shift, native CSS variable inheritance, and edge rendering strategies for developer tools.',
    url: 'https://ui.limonify.com/blog/distributed-microfrontends',
    tag: 'Architecture',
    readTime: '4 min read',
  }

  const defaultCuratedItems: NewsItem[] = [
    {
      title: 'TypeScript 7.0 and ECMAScript 2026 Feature Deep-Dive',
      snippet: 'New compiler optimizers reduce incremental type-check latency by 45%.',
      url: 'https://ui.limonify.com/blog/typescript-7-features',
      tag: 'TypeScript',
      readTime: '3 min',
    },
    {
      title: 'Mathematical OKLCH Color Space in Modern UI Systems',
      snippet: 'Why perception-uniform color algorithms eliminate contrast degradation across dark modes.',
      url: 'https://ui.limonify.com/blog/oklch-design-systems',
      tag: 'Design Systems',
      readTime: '5 min',
    },
  ]

  const resolvedTopStory = topStory || defaultTopStory
  const resolvedCurated = curatedItems || defaultCuratedItems
  const resolvedFooter =
    footerNote || 'You are receiving this daily briefing because you are subscribed to Limonify Daily.'

  return (
    <EmailLayout
      previewText={`${issueNumber} • ${resolvedTopStory.title}`}
      appName={appName}
      theme={theme}
      {...layoutProps}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <EmailBadge variant="neutral" theme={theme}>
          {badgeText} {issueNumber}
        </EmailBadge>
        <span style={{ fontSize: '11px', color: theme.mutedForeground, fontFamily: theme.fontFamily }}>
          {date}
        </span>
      </div>

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
          margin: '0 0 20px',
          fontFamily: theme.fontFamily,
        }}
      >
        {description}
      </Text>

      {/* Top Story Feature Card */}
      <div
        style={{
          backgroundColor: cardBg,
          borderRadius: '8px',
          border: `1px solid ${cardBorder}`,
          padding: '16px 18px',
          margin: '18px 0 22px',
          fontFamily: theme.fontFamily,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: isDark ? '#facc15' : '#ca8a04' }}>
            {topStoryLabel}
          </span>
          {resolvedTopStory.readTime ? (
            <span style={{ fontSize: '11px', color: theme.mutedForeground }}>{resolvedTopStory.readTime}</span>
          ) : null}
        </div>

        <Text
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: theme.foreground,
            margin: '0 0 6px',
            letterSpacing: '-0.01em',
            fontFamily: theme.fontFamily,
          }}
        >
          {resolvedTopStory.title}
        </Text>

        <Text
          style={{
            fontSize: '12px',
            color: theme.mutedForeground,
            lineHeight: '18px',
            margin: '0 0 10px',
            fontFamily: theme.fontFamily,
          }}
        >
          {resolvedTopStory.snippet}
        </Text>

        <Link
          href={resolvedTopStory.url}
          style={{
            fontSize: '12px',
            fontWeight: '600',
            color: theme.foreground,
            textDecoration: 'underline',
            fontFamily: theme.fontFamily,
          }}
        >
          {readMoreText} →
        </Link>
      </div>

      {/* Curated list header */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: theme.mutedForeground,
          margin: '22px 0 10px',
          fontFamily: theme.fontFamily,
        }}
      >
        {curatedLabel}
      </div>

      {/* Curated items list */}
      <div style={{ fontFamily: theme.fontFamily }}>
        {resolvedCurated.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: '12px 0',
              borderBottom: idx < resolvedCurated.length - 1 ? `1px solid ${dividerBorder}` : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: theme.foreground,
                }}
              >
                {item.title}
              </span>
              {item.tag ? (
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    backgroundColor: isDark ? '#262626' : '#e4e4e7',
                    color: isDark ? '#d4d4d4' : '#52525b',
                    marginLeft: '8px',
                  }}
                >
                  {item.tag}
                </span>
              ) : null}
            </div>
            <p
              style={{
                fontSize: '12px',
                color: theme.mutedForeground,
                lineHeight: '18px',
                margin: '0 0 6px',
              }}
            >
              {item.snippet}
            </p>
            <Link
              href={item.url}
              style={{
                fontSize: '11px',
                fontWeight: '500',
                color: theme.mutedForeground,
                textDecoration: 'underline',
              }}
            >
              {readMoreText} →
            </Link>
          </div>
        ))}
      </div>

      <Text
        style={{
          fontSize: '11px',
          color: theme.mutedForeground,
          lineHeight: '16px',
          margin: '24px 0 0',
          fontFamily: theme.fontFamily,
        }}
      >
        {resolvedFooter}
      </Text>
    </EmailLayout>
  )
}
