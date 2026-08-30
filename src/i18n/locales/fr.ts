import type { EmailLocaleDictionary } from "../types.js";

export const frLocale: EmailLocaleDictionary = {
  layout: {
    supportText: "Vous avez des questions ou besoin d’aide ?",
    contactSupport: "Contacter le Support",
    allRightsReserved: "Tous droits réservés.",
    unsubscribe: "Se désabonner des e-mails",
  },
  otp: {
    badgeText: "Vérification de Sécurité",
    heading: "Code de Vérification",
    description:
      "Veuillez utiliser le code de vérification à usage unique ci-dessous pour vous connecter en toute sécurité :",
    expirationText: "Ce code est valide pendant {{ .ExpiresIn }}.",
    securityNotice:
      "Si vous n’êtes pas à l’origine de cette demande, aucune action n’est requise.",
  },
  passwordReset: {
    badgeText: "Sécurité du Compte",
    heading: "Réinitialiser votre Mot de Passe",
    description:
      "Bonjour {{ .UserName }}, nous avons reçu une demande de réinitialisation de votre mot de passe :",
    buttonText: "Réinitialiser le Mot de Passe →",
    securityNoticeTitle: "Avis de Sécurité",
    securityNoticeText:
      "Ce lien expirera dans {{ .ExpiresIn }}. Si vous n’avez pas fait cette demande, votre compte est sécurisé.",
  },
  welcome: {
    badgeText: "Bienvenue à Bord",
    heading: "Bienvenue sur {{ .AppName }} ! ✨",
    description:
      "Bonjour {{ .UserName }}, nous sommes ravis de vous compter parmi nous. Votre compte est activé.",
    buttonText: "Aller au Tableau de Bord →",
    footerText:
      "Explorez nos composants et faites-nous savoir si vous avez besoin d’aide !",
    step1Title: "Vérifiez votre E-mail",
    step1Desc: "Votre adresse e-mail a été confirmée avec succès.",
    step2Title: "Complétez votre Profil",
    step2Desc: "Configurez votre espace de travail et vos préférences.",
    step3Title: "Commencez à Créer",
    step3Desc: "Explorez la bibliothèque de composants et lancez votre projet.",
  },
  notification: {
    badgeText: "Alerte de Sécurité",
    greeting: "Bonjour {{ .UserName }},",
    actionText: "Examiner l’Activité →",
    sessionTitle: "Détails de l’Appareil et de la Session",
    deviceLabel: "Appareil / OS :",
    locationLabel: "Emplacement :",
    ipLabel: "Adresse IP :",
    timeLabel: "Heure :",
  },
  paymentCompleted: {
    badgeText: "Paiement Confirmé",
    heading: "Merci pour votre Commande !",
    description:
      "Bonjour {{ .UserName }}, votre paiement pour {{ .PlanName }} a été traité avec succès. Voici votre reçu :",
    orderIdLabel: "Numéro de Facture",
    dateLabel: "Date de Facturation",
    planLabel: "Plan / Abonnement",
    paymentMethodLabel: "Moyen de Paiement",
    subtotalLabel: "Sous-total",
    taxLabel: "TVA",
    amountLabel: "Total Payé",
    buttonText: "Télécharger la Facture (PDF) →",
  },
  magicLink: {
    badgeText: "Connexion Instantanée",
    heading: "Se Connecter à {{ .AppName }}",
    description:
      "Cliquez sur le bouton ci-dessous pour vous connecter à votre compte sans mot de passe :",
    buttonText: "Se Connecter Immédiatement →",
    securityNoticeTitle: "Avis de Sécurité",
    securityNoticeText:
      "Ce lien à usage unique expirera dans {{ .ExpiresIn }}. Si vous ne l’avez pas demandé, vous pouvez l’ignorer.",
  },
};
