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
};
