import type { EmailLocaleDictionary } from "../types.js";

export const frLocale: EmailLocaleDictionary = {
  layout: {
    supportText: "Besoin d’aide ou des questions ?",
    contactSupport: "Contacter le support",
    allRightsReserved: "Tous droits réservés.",
    unsubscribe: "Se désabonner",
  },
  otp: {
    badgeText: "Code de vérification",
    heading: "Vérification de connexion",
    description:
      "Veuillez utiliser le code de vérification à usage unique ci-dessous :",
    expirationText: "Ce code expire dans {{ .ExpiresIn }}.",
    securityNotice:
      "Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer cet e-mail.",
  },
  passwordReset: {
    badgeText: "Sécurité",
    heading: "Réinitialiser votre mot de passe",
    description:
      "Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez ci-dessous :",
    buttonText: "Réinitialiser le mot de passe",
    securityNoticeTitle: "Avis de sécurité",
    securityNoticeText: "Ce lien expirera dans {{ .ExpiresIn }}.",
  },
  welcome: {
    badgeText: "Bienvenue",
    heading: "Bienvenue sur {{ .AppName }}",
    description:
      "Bonjour {{ .UserName }}, votre compte est prêt à être utilisé.",
    buttonText: "Accéder au tableau de bord",
    footerText: "Faites-nous savoir si vous avez des questions.",
    step1Title: "E-mail confirmé",
    step1Desc: "Votre adresse e-mail a été vérifiée.",
    step2Title: "Configuration de l’espace",
    step2Desc: "Configurez votre équipe et vos préférences.",
    step3Title: "Commencer",
    step3Desc: "Explorez les composants et lancez votre projet.",
  },
  notification: {
    badgeText: "Avis de sécurité",
    greeting: "Bonjour {{ .UserName }},",
    actionText: "Examiner l’activité",
    sessionTitle: "Détails de la session",
    deviceLabel: "Appareil",
    locationLabel: "Emplacement",
    ipLabel: "Adresse IP",
    timeLabel: "Horodatage",
  },
  paymentCompleted: {
    badgeText: "Payé",
    heading: "Reçu de paiement",
    description:
      "Votre paiement pour {{ .PlanName }} a été traité avec succès.",
    orderIdLabel: "Facture",
    dateLabel: "Date",
    planLabel: "Article",
    paymentMethodLabel: "Moyen de paiement",
    subtotalLabel: "Sous-total",
    taxLabel: "TVA",
    amountLabel: "Total payé",
    buttonText: "Télécharger la facture (PDF)",
  },
  magicLink: {
    badgeText: "Connexion",
    heading: "Se connecter à {{ .AppName }}",
    description: "Cliquez sur le bouton ci-dessous pour vous connecter :",
    buttonText: "Se connecter au compte",
    securityNoticeTitle: "Avis de sécurité",
    securityNoticeText: "Ce lien expirera dans {{ .ExpiresIn }}.",
  },
  teamInvite: {
    badgeText: "Invitation d’équipe",
    heading: "Rejoindre l’espace de travail",
    description:
      "{{ .InviterName }} vous a invité à rejoindre l’espace de travail {{ .WorkspaceName }}.",
    roleLabel: "Rôle attribué",
    workspaceLabel: "Espace de travail",
    buttonText: "Accepter l’invitation",
    declineText:
      "Si vous n’attendiez pas cette invitation, vous pouvez ignorer cet e-mail.",
  },
  subscriptionCanceled: {
    badgeText: "Abonnement",
    heading: "Abonnement résilié",
    description:
      "Votre abonnement pour {{ .PlanName }} a été résilié. Votre accès restera actif jusqu’à la fin de la période de facturation en cours.",
    expiryLabel: "Accès expire le",
    planLabel: "Plan précédent",
    reactivateButtonText: "Réactiver l’abonnement",
    feedbackText: "Nous aimerions savoir comment nous pouvons nous améliorer.",
  },
  apiKeyCreated: {
    badgeText: "Sécurité",
    heading: "Nouvelle clé API créée",
    description: "Une nouvelle clé API a été créée pour votre compte.",
    keyNameLabel: "Nom de la clé",
    keyPrefixLabel: "Préfixe",
    createdLabel: "Créée le",
    revokeButtonText: "Gérer les clés API",
    securityNotice: "Ne partagez jamais vos clés API publiquement.",
  },
  usageLimitWarning: {
    badgeText: "Alerte d’utilisation",
    heading: "Alerte de limite de quota",
    description:
      "Vous avez atteint {{ .UsagePercent }} de votre quota mensuel sur {{ .AppName }}.",
    usageLabel: "Utilisation actuelle",
    limitLabel: "Limite mensuelle",
    resetDateLabel: "Réinitialisation le",
    upgradeButtonText: "Mettre à niveau le plan",
  },
  feedbackRequest: {
    badgeText: "Avis",
    heading: "Quelle est votre expérience ?",
    description:
      "Bonjour {{ .UserName }}, nous aimerions avoir votre avis sur {{ .AppName }}.",
    buttonText: "Donner mon avis (2 min)",
    footerText: "Vos retours nous aident directement à améliorer le produit.",
  },
  productUpdate: {
    badgeText: "Mise à jour",
    heading: "Quoi de neuf dans {{ .AppName }} {{ .Version }}",
    description:
      "Voici les dernières fonctionnalités et améliorations de cette version :",
    buttonText: "Lire les notes de version",
  },
};
