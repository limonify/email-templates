import type { SupportedLocale } from "@limonify/email-templates/web";

/**
 * Realistic values for the preview gallery, so a template can be read as a
 * finished email instead of a page of `{{ .Placeholders }}`. Toggling the
 * gallery to "Backend variables" simply skips these.
 *
 * Kept in sync with the sample data in the package's legacy preview server
 * (`src/preview/server.ts`).
 */
export function sampleProps(locale: SupportedLocale): Record<string, any> {
  return {
    appName: "Limonify",
    logoUrl:
      "https://raw.githubusercontent.com/limonify/email-templates/main/.github/assets/logo.png",
    logoWidth: 26,
    logoHeight: 26,
    code: "849201",
    userName: "Alex Morgan",
    inviterName: "Sarah Connor",
    authorName: "Sarah Connor",
    targetName: "Feature / Native Navigation #42",
    commentBody:
      "@alex Could you check the OKLCH token parser on Safari mobile? The preview looks sharp.",
    newEmail: "alex.morgan@company.io",
    workspaceName: "Engineering Core",
    projectName: "limonify-ui-native",
    role: "Admin",
    subject: "Scheduled Infrastructure Upgrade",
    message:
      "We are rolling out zero-downtime distributed edge clusters across Frankfurt and North America to improve latency by up to 2x.",
    actionUrl: "https://ui.limonify.com/infrastructure/upgrades",
    noticeTitle: "Scheduled Maintenance Window",
    noticeText:
      "Upgrades will occur on Sunday, Sept 6 between 02:00 and 02:30 UTC with zero expected downtime.",
    inviteUrl: "https://ui.limonify.com/invites/accept",
    resetUrl: "https://ui.limonify.com/reset",
    dashboardUrl: "https://ui.limonify.com/dashboard",
    loginUrl: "https://ui.limonify.com/magic-login",
    confirmUrl: "https://ui.limonify.com/email/confirm?token=94820",
    threadUrl: "https://ui.limonify.com/discussions/42#reply",
    deployUrl: "https://ui.limonify.com/deployments/dpl_94f8a2",
    logsUrl: "https://ui.limonify.com/deployments/dpl_failed_94/logs",
    statusUrl: "https://status.limonify.com/incidents/inc_9482",
    checkoutUrl: "https://ui.limonify.com/checkout?cart=c_94820",
    surveyUrl: "https://ui.limonify.com/survey",
    manageUrl: "https://ui.limonify.com/settings/tokens",
    upgradeUrl: "https://ui.limonify.com/billing/upgrade",
    updateBillingUrl: "https://ui.limonify.com/billing/payment-methods",
    cancelDeletionUrl: "https://ui.limonify.com/account/restore",
    secureAccountUrl: "https://ui.limonify.com/security/2fa",
    analyticsUrl: "https://ui.limonify.com/analytics",
    trackingUrl: "https://ui.limonify.com/orders/track/9482",
    changelogUrl: "https://ui.limonify.com/changelog",
    version: "v2.4.0",
    daysLeft: "3",
    cartTotal: "$199.00",
    issueNumber: "#142",
    date:
      locale === "tr"
        ? "Pazartesi, 31 Ağustos 2026"
        : "Monday, August 31, 2026",
    scheduledDate: "September 30, 2026",
    retryDate: "September 2, 2026",
    incidentTitle: "Investigating elevated API latency in EU region",
    status: "Investigating",
    affectedServices: "API Gateway, Webhooks (eu-central-1)",
    branch: "main",
    commitHash: "8af2614",
    commitMessage:
      "feat: add OKLCH mathematical color parser and 26 email templates",
    duration: "38s",
    exitStatus: "Command failed with exit code 1 (tsc)",
    errorSnippet:
      "error TS2322: Type 'string' is not assignable to type 'number'.\n  src/components/table.tsx:42:15",
    keyName: "Production Deployer Token",
    keyPrefix: "lmn_live_94f8...",
    createdAt: "August 30, 2026 at 23:15 UTC",
    metricName: "API Requests",
    usagePercent: "88%",
    currentUsage: "88,420 / 100,000 reqs",
    monthlyLimit: "100,000 reqs/mo",
    resetDate: "September 1, 2026",
    expiryDate: "September 30, 2026",
    reactivateUrl: "https://ui.limonify.com/billing/reactivate",
    expiresIn:
      locale === "tr"
        ? "10 dakika"
        : locale === "de"
          ? "10 Minuten"
          : "10 minutes",
    orderId: "INV-2026-9482",
    trackingNumber: "TRK-9481-0294-DHL",
    carrier: "DHL Express Worldwide",
    estDelivery: locale === "tr" ? "Perşembe, 3 Eylül" : "Thursday, Sept 3",
    amount: "$49.00",
    planName: "Limonify Pro (Annual)",
    paymentMethod: "Visa •••• 4242",
    subtotal: "$40.83",
    tax: "$8.17",
    receiptUrl: "https://ui.limonify.com/invoices/94820",
    title: locale === "tr" ? "Güvenlik Bildirimi" : "Security notice",
    sessionDetails: {
      device: "MacBook Pro (macOS 15.4)",
      browser: "Safari 18.3",
      location: "San Francisco, CA, United States",
      ipAddress: "192.0.2.14",
      timestamp: "August 30, 2026 at 23:15 UTC",
    },
  };
}
