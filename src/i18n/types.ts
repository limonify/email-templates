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
}
