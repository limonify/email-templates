export type SupportedLocale = "en" | "tr" | "de" | "es" | "fr" | (string & {});

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface EmailLocaleDictionary {
  layout: {
    supportText: string;
    contactSupport: string;
    allRightsReserved: string;
    unsubscribe: string;
  };
  otp: {
    badgeText: string;
    heading: string;
    description: string;
    expirationText: string;
    securityNotice: string;
  };
  passwordReset: {
    badgeText: string;
    heading: string;
    description: string;
    buttonText: string;
    securityNoticeTitle: string;
    securityNoticeText: string;
  };
  welcome: {
    badgeText: string;
    heading: string;
    description: string;
    buttonText: string;
    footerText: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  notification: {
    badgeText: string;
    greeting: string;
    actionText: string;
    sessionTitle: string;
    deviceLabel: string;
    locationLabel: string;
    ipLabel: string;
    timeLabel: string;
  };
  paymentCompleted: {
    badgeText: string;
    heading: string;
    description: string;
    orderIdLabel: string;
    dateLabel: string;
    planLabel: string;
    paymentMethodLabel: string;
    subtotalLabel: string;
    taxLabel: string;
    amountLabel: string;
    buttonText: string;
  };
  magicLink: {
    badgeText: string;
    heading: string;
    description: string;
    buttonText: string;
    securityNoticeTitle: string;
    securityNoticeText: string;
  };
  teamInvite: {
    badgeText: string;
    heading: string;
    description: string;
    roleLabel: string;
    workspaceLabel: string;
    buttonText: string;
    declineText: string;
  };
  subscriptionCanceled: {
    badgeText: string;
    heading: string;
    description: string;
    expiryLabel: string;
    planLabel: string;
    reactivateButtonText: string;
    feedbackText: string;
  };
  apiKeyCreated: {
    badgeText: string;
    heading: string;
    description: string;
    keyNameLabel: string;
    keyPrefixLabel: string;
    createdLabel: string;
    revokeButtonText: string;
    securityNotice: string;
  };
  usageLimitWarning: {
    badgeText: string;
    heading: string;
    description: string;
    usageLabel: string;
    limitLabel: string;
    resetDateLabel: string;
    upgradeButtonText: string;
  };
  feedbackRequest: {
    badgeText: string;
    heading: string;
    description: string;
    buttonText: string;
    footerText: string;
  };
  productUpdate: {
    badgeText: string;
    heading: string;
    description: string;
    buttonText: string;
  };
  paymentFailed: {
    badgeText: string;
    heading: string;
    description: string;
    amountLabel: string;
    retryDateLabel: string;
    buttonText: string;
    noticeText: string;
  };
  trialEnding: {
    badgeText: string;
    heading: string;
    description: string;
    daysLeftLabel: string;
    expiryDateLabel: string;
    buttonText: string;
  };
  accountDeletion: {
    badgeText: string;
    heading: string;
    description: string;
    scheduledDateLabel: string;
    cancelButtonText: string;
    warningText: string;
  };
  twoFactorDisabled: {
    badgeText: string;
    heading: string;
    description: string;
    actionText: string;
    securityWarning: string;
  };
  weeklyDigest: {
    badgeText: string;
    heading: string;
    description: string;
    buttonText: string;
  };
  orderShipped: {
    badgeText: string;
    heading: string;
    description: string;
    trackingLabel: string;
    carrierLabel: string;
    estDeliveryLabel: string;
    buttonText: string;
  };
  deploySucceeded: {
    badgeText: string;
    heading: string;
    description: string;
    branchLabel: string;
    commitLabel: string;
    durationLabel: string;
    buttonText: string;
  };
  deployFailed: {
    badgeText: string;
    heading: string;
    description: string;
    branchLabel: string;
    commitLabel: string;
    errorLabel: string;
    buttonText: string;
  };
  commentMention: {
    badgeText: string;
    heading: string;
    description: string;
    buttonText: string;
  };
  emailChange: {
    badgeText: string;
    heading: string;
    description: string;
    buttonText: string;
    securityNotice: string;
  };
  cartAbandonment: {
    badgeText: string;
    heading: string;
    description: string;
    totalLabel: string;
    buttonText: string;
  };
  incidentReport: {
    badgeText: string;
    heading: string;
    description: string;
    statusLabel: string;
    affectedLabel: string;
    buttonText: string;
  };
  dailyNewsletter: {
    badgeText: string;
    heading: string;
    description: string;
    topStoryLabel: string;
    readMoreText: string;
    curatedLabel: string;
    footerNote: string;
  };
  announcement: {
    badgeText: string;
    heading: string;
    description: string;
    buttonText: string;
  };
}
