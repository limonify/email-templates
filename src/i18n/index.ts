import type { SupportedLocale, EmailLocaleDictionary } from "./types.js";
import { enLocale } from "./locales/en.js";
import { trLocale } from "./locales/tr.js";
import { deLocale } from "./locales/de.js";
import { esLocale } from "./locales/es.js";
import { frLocale } from "./locales/fr.js";

export * from "./types.js";

export const LOCALES_REGISTRY: Record<
  SupportedLocale,
  { name: string; flag: string; dict: EmailLocaleDictionary }
> = {
  en: { name: "English", flag: "🇺🇸", dict: enLocale },
  tr: { name: "Türkçe", flag: "🇹🇷", dict: trLocale },
  de: { name: "Deutsch", flag: "🇩🇪", dict: deLocale },
  es: { name: "Español", flag: "🇪🇸", dict: esLocale },
  fr: { name: "Français", flag: "🇫🇷", dict: frLocale },
};

export function getLocaleDictionary(
  locale: string = "en",
): EmailLocaleDictionary {
  const clean = locale.toLowerCase().slice(0, 2) as SupportedLocale;
  return LOCALES_REGISTRY[clean]?.dict || enLocale;
}

export function getTemplatePropsForLocale(
  templateId: string,
  locale: string = "en",
): Record<string, any> {
  const dict = getLocaleDictionary(locale);

  switch (templateId) {
    case "otp":
      return {
        badgeText: dict.otp.badgeText,
        heading: dict.otp.heading,
        description: dict.otp.description,
        expirationText: dict.otp.expirationText,
        securityNotice: dict.otp.securityNotice,
        supportText: dict.layout.supportText,
      };
    case "password-reset":
      return {
        badgeText: dict.passwordReset.badgeText,
        heading: dict.passwordReset.heading,
        description: dict.passwordReset.description,
        buttonText: dict.passwordReset.buttonText,
        securityNoticeTitle: dict.passwordReset.securityNoticeTitle,
        securityNoticeText: dict.passwordReset.securityNoticeText,
        supportText: dict.layout.supportText,
      };
    case "welcome":
      return {
        badgeText: dict.welcome.badgeText,
        heading: dict.welcome.heading,
        description: dict.welcome.description,
        buttonText: dict.welcome.buttonText,
        footerText: dict.welcome.footerText,
        supportText: dict.layout.supportText,
        steps: [
          {
            number: 1,
            title: dict.welcome.step1Title,
            description: dict.welcome.step1Desc,
            completed: true,
          },
          {
            number: 2,
            title: dict.welcome.step2Title,
            description: dict.welcome.step2Desc,
            completed: false,
          },
          {
            number: 3,
            title: dict.welcome.step3Title,
            description: dict.welcome.step3Desc,
            completed: false,
          },
        ],
      };
    case "notification":
      return {
        badgeText: dict.notification.badgeText,
        greeting: dict.notification.greeting,
        actionText: dict.notification.actionText,
        supportText: dict.layout.supportText,
      };
    case "payment-completed":
      return {
        badgeText: dict.paymentCompleted.badgeText,
        heading: dict.paymentCompleted.heading,
        description: dict.paymentCompleted.description,
        orderIdLabel: dict.paymentCompleted.orderIdLabel,
        dateLabel: dict.paymentCompleted.dateLabel,
        planLabel: dict.paymentCompleted.planLabel,
        paymentMethodLabel: dict.paymentCompleted.paymentMethodLabel,
        subtotalLabel: dict.paymentCompleted.subtotalLabel,
        taxLabel: dict.paymentCompleted.taxLabel,
        amountLabel: dict.paymentCompleted.amountLabel,
        buttonText: dict.paymentCompleted.buttonText,
        supportText: dict.layout.supportText,
      };
    case "magic-link":
      return {
        badgeText: dict.magicLink.badgeText,
        heading: dict.magicLink.heading,
        description: dict.magicLink.description,
        buttonText: dict.magicLink.buttonText,
        securityNoticeTitle: dict.magicLink.securityNoticeTitle,
        securityNoticeText: dict.magicLink.securityNoticeText,
        supportText: dict.layout.supportText,
      };
    default:
      return {};
  }
}
