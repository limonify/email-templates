import type { EmailLocaleDictionary } from "../types.js";

export const deLocale: EmailLocaleDictionary = {
  layout: {
    supportText: "Haben Sie Fragen oder benötigen Sie Hilfe?",
    contactSupport: "Kundensupport kontaktieren",
    allRightsReserved: "Alle Rechte vorbehalten.",
    unsubscribe: "Von E-Mails abmelden",
  },
  otp: {
    badgeText: "Sicherheitsüberprüfung",
    heading: "Bestätigungscode zur Anmeldung",
    description:
      "Bitte verwenden Sie den folgenden einmaligen Bestätigungscode, um sich sicher anzumelden:",
    expirationText: "Dieser Code ist gültig für {{ .ExpiresIn }}.",
    securityNotice:
      "Falls Sie diese Anfrage nicht gestellt haben, ist keine Aktion erforderlich.",
  },
  passwordReset: {
    badgeText: "Kontosicherheit",
    heading: "Passwort zurücksetzen",
    description:
      "Hallo {{ .UserName }}, wir haben eine Anfrage zum Zurücksetzen Ihres Passworts erhalten. Klicken Sie unten:",
    buttonText: "Passwort zurücksetzen →",
    securityNoticeTitle: "Sicherheitshinweis",
    securityNoticeText:
      "Dieser Link läuft in {{ .ExpiresIn }} ab. Falls Sie die Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail.",
  },
  welcome: {
    badgeText: "Willkommen an Bord",
    heading: "Willkommen bei {{ .AppName }}! ✨",
    description:
      "Hallo {{ .UserName }}, wir freuen uns sehr, Sie bei uns zu haben. Ihr Konto ist aktiviert und startklar.",
    buttonText: "Zum Dashboard →",
    footerText:
      "Erkunden Sie unsere Komponenten und wenden Sie sich bei Fragen gerne an uns!",
    step1Title: "E-Mail bestätigen",
    step1Desc: "Ihre E-Mail-Adresse wurde erfolgreich bestätigt.",
    step2Title: "Profil vervollständigen",
    step2Desc: "Richten Sie Ihren Arbeitsbereich und Ihre Präferenzen ein.",
    step3Title: "Starten Sie mit dem Erstellen",
    step3Desc: "Entdecken Sie die Komponenten und bauen Sie Ihre Produkte.",
  },
  notification: {
    badgeText: "Sicherheitswarnung",
    greeting: "Hallo {{ .UserName }},",
    actionText: "Aktivität überprüfen →",
    sessionTitle: "Geräte- & Sitzungsdetails",
    deviceLabel: "Gerät / Betriebssystem:",
    locationLabel: "Standort:",
    ipLabel: "IP-Adresse:",
    timeLabel: "Zeit:",
  },
  paymentCompleted: {
    badgeText: "Zahlung bestätigt",
    heading: "Vielen Dank für Ihre Bestellung!",
    description:
      "Hallo {{ .UserName }}, Ihre Zahlung für {{ .PlanName }} war erfolgreich. Hier ist Ihre Rechnung:",
    orderIdLabel: "Rechnungsnummer",
    dateLabel: "Rechnungsdatum",
    planLabel: "Plan / Abonnement",
    paymentMethodLabel: "Zahlungsart",
    subtotalLabel: "Zwischensumme",
    taxLabel: "MwSt.",
    amountLabel: "Gesamtbetrag",
    buttonText: "Rechnung herunterladen (PDF) →",
  },
  magicLink: {
    badgeText: "Sofortige Anmeldung",
    heading: "Bei {{ .AppName }} anmelden",
    description:
      "Klicken Sie auf die Schaltfläche unten, um sich ohne Passwort anzumelden:",
    buttonText: "Jetzt anmelden →",
    securityNoticeTitle: "Sicherheitshinweis",
    securityNoticeText:
      "Dieser Link läuft in {{ .ExpiresIn }} ab und kann nur einmal verwendet werden.",
  },
};
