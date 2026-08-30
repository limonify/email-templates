import type { EmailLocaleDictionary } from "../types.js";

export const enLocale: EmailLocaleDictionary = {
  layout: {
    supportText: "Need help or have questions?",
    contactSupport: "Contact support",
    allRightsReserved: "All rights reserved.",
    unsubscribe: "Unsubscribe",
  },
  otp: {
    badgeText: "Verification code",
    heading: "Sign in verification",
    description:
      "Use the verification code below to complete your sign in request:",
    expirationText: "This code expires in {{ .ExpiresIn }}.",
    securityNotice:
      "If you did not request this verification code, you can safely ignore this email.",
  },
  passwordReset: {
    badgeText: "Security",
    heading: "Reset your password",
    description:
      "We received a request to reset the password for your account. Click the button below to proceed:",
    buttonText: "Reset password",
    securityNoticeTitle: "Security note",
    securityNoticeText:
      "This link will expire in {{ .ExpiresIn }}. If you did not request a password reset, no action is required.",
  },
  welcome: {
    badgeText: "Welcome",
    heading: "Welcome to {{ .AppName }}",
    description: "Hi {{ .UserName }}, your account is set up and ready to use.",
    buttonText: "Go to dashboard",
    footerText: "Let us know if you have any questions along the way.",
    step1Title: "Email confirmed",
    step1Desc: "Your primary email address is verified.",
    step2Title: "Workspace setup",
    step2Desc: "Configure your team and default workspace preferences.",
    step3Title: "Start building",
    step3Desc: "Explore the component library and ship your next project.",
  },
  notification: {
    badgeText: "Security notice",
    greeting: "Hi {{ .UserName }},",
    actionText: "Review activity",
    sessionTitle: "Session details",
    deviceLabel: "Device",
    locationLabel: "Location",
    ipLabel: "IP address",
    timeLabel: "Timestamp",
  },
  paymentCompleted: {
    badgeText: "Paid",
    heading: "Payment receipt",
    description:
      "Your payment for {{ .PlanName }} has been processed successfully.",
    orderIdLabel: "Invoice",
    dateLabel: "Date",
    planLabel: "Item",
    paymentMethodLabel: "Payment method",
    subtotalLabel: "Subtotal",
    taxLabel: "Tax",
    amountLabel: "Total paid",
    buttonText: "Download invoice (PDF)",
  },
  magicLink: {
    badgeText: "Sign in",
    heading: "Sign in to {{ .AppName }}",
    description:
      "Click the button below to securely sign in to your {{ .AppName }} account:",
    buttonText: "Sign in to account",
    securityNoticeTitle: "Security note",
    securityNoticeText:
      "This single-use link will expire in {{ .ExpiresIn }}. If you did not request this email, you can safely ignore it.",
  },
  teamInvite: {
    badgeText: "Team invite",
    heading: "Join workspace",
    description:
      "{{ .InviterName }} has invited you to join the {{ .WorkspaceName }} workspace on {{ .AppName }}.",
    roleLabel: "Assigned role",
    workspaceLabel: "Workspace",
    buttonText: "Accept invitation",
    declineText:
      "If you were not expecting this invitation, you can safely ignore this email.",
  },
  subscriptionCanceled: {
    badgeText: "Subscription",
    heading: "Subscription canceled",
    description:
      "Your subscription for {{ .PlanName }} has been canceled. Your access will remain active until the end of your current billing period.",
    expiryLabel: "Access expires",
    planLabel: "Previous plan",
    reactivateButtonText: "Reactivate subscription",
    feedbackText:
      "We would love to know how we can improve. If you have a moment, please share your thoughts with us.",
  },
  apiKeyCreated: {
    badgeText: "Security",
    heading: "New API token created",
    description:
      "A new API token was created for your account. If you did not create this token, revoke it immediately.",
    keyNameLabel: "Token name",
    keyPrefixLabel: "Token prefix",
    createdLabel: "Created at",
    revokeButtonText: "Manage API tokens",
    securityNotice:
      "Never share your API keys or commit them to public repositories.",
  },
  usageLimitWarning: {
    badgeText: "Usage alert",
    heading: "Quota limit alert",
    description:
      "You have reached {{ .UsagePercent }} of your monthly {{ .MetricName }} quota on {{ .AppName }}.",
    usageLabel: "Current usage",
    limitLabel: "Monthly limit",
    resetDateLabel: "Quota resets on",
    upgradeButtonText: "Upgrade plan",
  },
  feedbackRequest: {
    badgeText: "Feedback",
    heading: "How has your experience been?",
    description:
      "Hi {{ .UserName }}, we would love to hear your feedback on your experience with {{ .AppName }} so far.",
    buttonText: "Share feedback (2 mins)",
    footerText:
      "Your feedback directly shapes our product roadmap. Thank you for your time.",
  },
  productUpdate: {
    badgeText: "Changelog",
    heading: "What's new in {{ .AppName }} {{ .Version }}",
    description:
      "Here are the latest features, improvements, and updates shipped in this release:",
    buttonText: "Read full release notes",
  },
  paymentFailed: {
    badgeText: "Payment failed",
    heading: "Payment unsuccessful",
    description:
      "We were unable to process your payment of {{ .Amount }} for {{ .PlanName }}. Please update your payment method to maintain uninterrupted service.",
    amountLabel: "Amount due",
    retryDateLabel: "Next retry attempt",
    buttonText: "Update payment method",
    noticeText:
      "If your payment details are not updated, your subscription may be suspended.",
  },
  trialEnding: {
    badgeText: "Trial ending",
    heading: "Your trial ends soon",
    description:
      "Your free trial for {{ .AppName }} {{ .PlanName }} will expire in {{ .DaysLeft }} days. Upgrade now to keep full access to your workspace.",
    daysLeftLabel: "Time remaining",
    expiryDateLabel: "Trial ends on",
    buttonText: "Upgrade to Pro",
  },
  accountDeletion: {
    badgeText: "Account alert",
    heading: "Account deletion scheduled",
    description:
      "Your request to delete your {{ .AppName }} account has been received. Your data is scheduled for permanent deletion on {{ .ScheduledDate }}.",
    scheduledDateLabel: "Deletion date",
    cancelButtonText: "Cancel deletion & keep account",
    warningText:
      "After this date, all workspaces, API keys, and associated data will be permanently wiped and cannot be recovered.",
  },
  twoFactorDisabled: {
    badgeText: "Critical security",
    heading: "Two-factor authentication disabled",
    description:
      "Two-Factor Authentication (2FA) was recently disabled on your {{ .AppName }} account. If this was not authorized by you, secure your account immediately.",
    actionText: "Secure account & re-enable 2FA",
    securityWarning:
      "Disabling two-factor authentication significantly reduces your account security.",
  },
  weeklyDigest: {
    badgeText: "Weekly digest",
    heading: "Your weekly performance overview",
    description:
      "Here is a summary of your workspace activity and metrics for the past 7 days:",
    buttonText: "Open analytics dashboard",
  },
  orderShipped: {
    badgeText: "Shipped",
    heading: "Your order is on the way",
    description:
      "Great news! Your order {{ .OrderID }} has been shipped and is heading your way.",
    trackingLabel: "Tracking number",
    carrierLabel: "Shipping carrier",
    estDeliveryLabel: "Estimated delivery",
    buttonText: "Track shipment",
  },
};
