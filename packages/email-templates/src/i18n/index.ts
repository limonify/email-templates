import fs from "node:fs";
import path from "node:path";
import type {
  SupportedLocale,
  EmailLocaleDictionary,
  DeepPartial,
} from "./types.js";
import { enLocale } from "./locales/en.js";
import { trLocale } from "./locales/tr.js";
import { deLocale } from "./locales/de.js";
import { esLocale } from "./locales/es.js";
import { frLocale } from "./locales/fr.js";

export * from "./types.js";

export const LOCALES_REGISTRY: Record<
  string,
  { name: string; flag: string; dict: EmailLocaleDictionary }
> = {
  en: { name: "English", flag: "🇺🇸", dict: enLocale },
  tr: { name: "Türkçe", flag: "🇹🇷", dict: trLocale },
  de: { name: "Deutsch", flag: "🇩🇪", dict: deLocale },
  es: { name: "Español", flag: "🇪🇸", dict: esLocale },
  fr: { name: "Français", flag: "🇫🇷", dict: frLocale },
};

// In-memory registry of custom translations/overrides
const customOverrides: Record<string, DeepPartial<EmailLocaleDictionary>> = {};

export function registerCustomLocale(
  locale: string,
  dict: DeepPartial<EmailLocaleDictionary>,
  name?: string,
  flag?: string,
) {
  const clean = locale.toLowerCase();
  customOverrides[clean] = deepMerge(customOverrides[clean] || {}, dict);

  if (!LOCALES_REGISTRY[clean]) {
    LOCALES_REGISTRY[clean] = {
      name: name || locale.toUpperCase(),
      flag: flag || "🌐",
      dict: deepMerge(enLocale, dict) as EmailLocaleDictionary,
    };
  } else {
    LOCALES_REGISTRY[clean].dict = deepMerge(
      LOCALES_REGISTRY[clean].dict,
      dict,
    ) as EmailLocaleDictionary;
  }
}

export function loadCustomLocalesFromDir(
  dirPath: string = path.join(process.cwd(), "locales"),
) {
  if (!fs.existsSync(dirPath)) return;

  try {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      if (file.endsWith(".json")) {
        const localeCode = path.basename(file, ".json").toLowerCase();
        const content = JSON.parse(
          fs.readFileSync(path.join(dirPath, file), "utf8"),
        );
        registerCustomLocale(localeCode, content);
      }
    }
  } catch (err: any) {
    console.warn(
      `Warning: Could not load custom locales from ${dirPath}: ${err.message}`,
    );
  }
}

function deepMerge(target: any, source: any): any {
  const output = { ...target };
  if (source && typeof source === "object") {
    for (const key of Object.keys(source)) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        output[key] = deepMerge(target[key] || {}, source[key]);
      } else if (source[key] !== undefined) {
        output[key] = source[key];
      }
    }
  }
  return output;
}

export function getLocaleDictionary(
  locale: string = "en",
): EmailLocaleDictionary {
  const clean = locale.toLowerCase();
  const base =
    LOCALES_REGISTRY[clean]?.dict ||
    LOCALES_REGISTRY[clean.slice(0, 2)]?.dict ||
    enLocale;
  const overrides =
    customOverrides[clean] || customOverrides[clean.slice(0, 2)];
  return overrides
    ? (deepMerge(base, overrides) as EmailLocaleDictionary)
    : base;
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
    case "team-invite":
      return {
        badgeText: dict.teamInvite.badgeText,
        heading: dict.teamInvite.heading,
        description: dict.teamInvite.description,
        roleLabel: dict.teamInvite.roleLabel,
        workspaceLabel: dict.teamInvite.workspaceLabel,
        buttonText: dict.teamInvite.buttonText,
        declineText: dict.teamInvite.declineText,
        supportText: dict.layout.supportText,
      };
    case "subscription-canceled":
      return {
        badgeText: dict.subscriptionCanceled.badgeText,
        heading: dict.subscriptionCanceled.heading,
        description: dict.subscriptionCanceled.description,
        planLabel: dict.subscriptionCanceled.planLabel,
        expiryLabel: dict.subscriptionCanceled.expiryLabel,
        reactivateButtonText: dict.subscriptionCanceled.reactivateButtonText,
        feedbackText: dict.subscriptionCanceled.feedbackText,
        supportText: dict.layout.supportText,
      };
    case "api-key-created":
      return {
        badgeText: dict.apiKeyCreated.badgeText,
        heading: dict.apiKeyCreated.heading,
        description: dict.apiKeyCreated.description,
        keyNameLabel: dict.apiKeyCreated.keyNameLabel,
        keyPrefixLabel: dict.apiKeyCreated.keyPrefixLabel,
        createdLabel: dict.apiKeyCreated.createdLabel,
        revokeButtonText: dict.apiKeyCreated.revokeButtonText,
        securityNotice: dict.apiKeyCreated.securityNotice,
        supportText: dict.layout.supportText,
      };
    case "usage-limit-warning":
      return {
        badgeText: dict.usageLimitWarning.badgeText,
        heading: dict.usageLimitWarning.heading,
        description: dict.usageLimitWarning.description,
        usageLabel: dict.usageLimitWarning.usageLabel,
        limitLabel: dict.usageLimitWarning.limitLabel,
        resetDateLabel: dict.usageLimitWarning.resetDateLabel,
        upgradeButtonText: dict.usageLimitWarning.upgradeButtonText,
        supportText: dict.layout.supportText,
      };
    case "feedback-request":
      return {
        badgeText: dict.feedbackRequest.badgeText,
        heading: dict.feedbackRequest.heading,
        description: dict.feedbackRequest.description,
        buttonText: dict.feedbackRequest.buttonText,
        footerText: dict.feedbackRequest.footerText,
        supportText: dict.layout.supportText,
      };
    case "product-update":
      return {
        badgeText: dict.productUpdate.badgeText,
        heading: dict.productUpdate.heading,
        description: dict.productUpdate.description,
        buttonText: dict.productUpdate.buttonText,
        supportText: dict.layout.supportText,
      };
    case "payment-failed":
      return {
        badgeText: dict.paymentFailed.badgeText,
        heading: dict.paymentFailed.heading,
        description: dict.paymentFailed.description,
        amountLabel: dict.paymentFailed.amountLabel,
        retryDateLabel: dict.paymentFailed.retryDateLabel,
        buttonText: dict.paymentFailed.buttonText,
        noticeText: dict.paymentFailed.noticeText,
        supportText: dict.layout.supportText,
      };
    case "trial-ending":
      return {
        badgeText: dict.trialEnding.badgeText,
        heading: dict.trialEnding.heading,
        description: dict.trialEnding.description,
        daysLeftLabel: dict.trialEnding.daysLeftLabel,
        expiryDateLabel: dict.trialEnding.expiryDateLabel,
        buttonText: dict.trialEnding.buttonText,
        supportText: dict.layout.supportText,
      };
    case "account-deletion":
      return {
        badgeText: dict.accountDeletion.badgeText,
        heading: dict.accountDeletion.heading,
        description: dict.accountDeletion.description,
        scheduledDateLabel: dict.accountDeletion.scheduledDateLabel,
        cancelButtonText: dict.accountDeletion.cancelButtonText,
        warningText: dict.accountDeletion.warningText,
        supportText: dict.layout.supportText,
      };
    case "two-factor-disabled":
      return {
        badgeText: dict.twoFactorDisabled.badgeText,
        heading: dict.twoFactorDisabled.heading,
        description: dict.twoFactorDisabled.description,
        actionText: dict.twoFactorDisabled.actionText,
        securityWarning: dict.twoFactorDisabled.securityWarning,
        supportText: dict.layout.supportText,
      };
    case "weekly-digest":
      return {
        badgeText: dict.weeklyDigest.badgeText,
        heading: dict.weeklyDigest.heading,
        description: dict.weeklyDigest.description,
        buttonText: dict.weeklyDigest.buttonText,
        supportText: dict.layout.supportText,
      };
    case "order-shipped":
      return {
        badgeText: dict.orderShipped.badgeText,
        heading: dict.orderShipped.heading,
        description: dict.orderShipped.description,
        trackingLabel: dict.orderShipped.trackingLabel,
        carrierLabel: dict.orderShipped.carrierLabel,
        estDeliveryLabel: dict.orderShipped.estDeliveryLabel,
        buttonText: dict.orderShipped.buttonText,
        supportText: dict.layout.supportText,
      };
    case "deploy-succeeded":
      return {
        badgeText: dict.deploySucceeded.badgeText,
        heading: dict.deploySucceeded.heading,
        description: dict.deploySucceeded.description,
        branchLabel: dict.deploySucceeded.branchLabel,
        commitLabel: dict.deploySucceeded.commitLabel,
        durationLabel: dict.deploySucceeded.durationLabel,
        buttonText: dict.deploySucceeded.buttonText,
        supportText: dict.layout.supportText,
      };
    case "deploy-failed":
      return {
        badgeText: dict.deployFailed.badgeText,
        heading: dict.deployFailed.heading,
        description: dict.deployFailed.description,
        branchLabel: dict.deployFailed.branchLabel,
        commitLabel: dict.deployFailed.commitLabel,
        errorLabel: dict.deployFailed.errorLabel,
        buttonText: dict.deployFailed.buttonText,
        supportText: dict.layout.supportText,
      };
    case "comment-mention":
      return {
        badgeText: dict.commentMention.badgeText,
        heading: dict.commentMention.heading,
        description: dict.commentMention.description,
        buttonText: dict.commentMention.buttonText,
        supportText: dict.layout.supportText,
      };
    case "email-change":
      return {
        badgeText: dict.emailChange.badgeText,
        heading: dict.emailChange.heading,
        description: dict.emailChange.description,
        buttonText: dict.emailChange.buttonText,
        securityNotice: dict.emailChange.securityNotice,
        supportText: dict.layout.supportText,
      };
    case "cart-abandonment":
      return {
        badgeText: dict.cartAbandonment.badgeText,
        heading: dict.cartAbandonment.heading,
        description: dict.cartAbandonment.description,
        totalLabel: dict.cartAbandonment.totalLabel,
        buttonText: dict.cartAbandonment.buttonText,
        supportText: dict.layout.supportText,
      };
    case "incident-report":
      return {
        badgeText: dict.incidentReport.badgeText,
        heading: dict.incidentReport.heading,
        description: dict.incidentReport.description,
        statusLabel: dict.incidentReport.statusLabel,
        affectedLabel: dict.incidentReport.affectedLabel,
        buttonText: dict.incidentReport.buttonText,
        supportText: dict.layout.supportText,
      };
    case "daily-newsletter":
      return {
        badgeText: dict.dailyNewsletter.badgeText,
        heading: dict.dailyNewsletter.heading,
        description: dict.dailyNewsletter.description,
        topStoryLabel: dict.dailyNewsletter.topStoryLabel,
        readMoreText: dict.dailyNewsletter.readMoreText,
        curatedLabel: dict.dailyNewsletter.curatedLabel,
        footerNote: dict.dailyNewsletter.footerNote,
        supportText: dict.layout.supportText,
      };
    case "announcement":
      return {
        badgeText: dict.announcement.badgeText,
        heading: dict.announcement.heading,
        description: dict.announcement.description,
        buttonText: dict.announcement.buttonText,
        supportText: dict.layout.supportText,
      };
    default:
      return {};
  }
}
