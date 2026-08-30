import type { EmailLocaleDictionary } from "../types.js";

export const enLocale: EmailLocaleDictionary = {
  layout: {
    supportText: "Have questions or need assistance?",
    contactSupport: "Contact Support",
    allRightsReserved: "All rights reserved.",
    unsubscribe: "Unsubscribe from emails",
  },
  otp: {
    badgeText: "Security Verification",
    heading: "Sign In Verification Code",
    description:
      "Please use the one-time verification code below to securely authenticate your session:",
    expirationText: "This code is valid for {{ .ExpiresIn }}.",
    securityNotice:
      "If you didn't initiate this request, no action is required and you can safely disregard this message.",
  },
  passwordReset: {
    badgeText: "Account Security",
    heading: "Reset Your Password",
    description:
      "Hi {{ .UserName }}, we received a password reset request for your account. Click the button below to choose a new password:",
    buttonText: "Reset Password →",
    securityNoticeTitle: "Security Notice",
    securityNoticeText:
      "This reset link will expire in {{ .ExpiresIn }}. If you did not make this request, your account remains secure and you can safely ignore this email.",
  },
  welcome: {
    badgeText: "Welcome Aboard",
    heading: "Welcome to {{ .AppName }}! ✨",
    description:
      "Hi {{ .UserName }}, we're thrilled to have you with us. Your account is activated and ready to build modern experiences.",
    buttonText: "Go to Dashboard →",
    footerText:
      "Explore our components, start customizing your themes, and let us know if you need any help along the way!",
    step1Title: "Verify Your Email",
    step1Desc: "Your email address has been confirmed and verified.",
    step2Title: "Complete Your Profile",
    step2Desc: "Set up your workspace, team members, and preferences.",
    step3Title: "Start Building",
    step3Desc: "Explore the component library and ship your next project.",
  },
  notification: {
    badgeText: "Security Alert",
    greeting: "Hi {{ .UserName }},",
    actionText: "Review Security Activity →",
    sessionTitle: "Device & Session Details",
    deviceLabel: "Device / OS:",
    locationLabel: "Location:",
    ipLabel: "IP Address:",
    timeLabel: "Time:",
  },
  paymentCompleted: {
    badgeText: "Payment Confirmed",
    heading: "Thank You for Your Order!",
    description:
      "Hi {{ .UserName }}, your payment for {{ .PlanName }} has been successfully processed. Here is your receipt summary:",
    orderIdLabel: "Invoice ID",
    dateLabel: "Billing Date",
    planLabel: "Plan / Subscription",
    paymentMethodLabel: "Payment Method",
    subtotalLabel: "Subtotal",
    taxLabel: "Tax / VAT",
    amountLabel: "Total Paid",
    buttonText: "Download Invoice (PDF) →",
  },
  magicLink: {
    badgeText: "Instant Sign In",
    heading: "Sign In to {{ .AppName }}",
    description:
      "Click the button below to securely sign in to your {{ .AppName }} account without entering a password:",
    buttonText: "Sign In Instantly →",
    securityNoticeTitle: "Security Notice",
    securityNoticeText:
      "This single-use magic link will expire in {{ .ExpiresIn }}. If you did not request this email, you can safely ignore it.",
  },
};
