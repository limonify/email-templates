import type { EmailLocaleDictionary } from "../types.js";

export const deLocale: EmailLocaleDictionary = {
  layout: {
    supportText: "Haben Sie Fragen oder benötigen Sie Hilfe?",
    contactSupport: "Kundensupport kontaktieren",
    allRightsReserved: "Alle Rechte vorbehalten.",
    unsubscribe: "Von E-Mails abmelden",
  },
  otp: {
    badgeText: "Bestätigungscode",
    heading: "Bestätigungscode zur Anmeldung",
    description:
      "Bitte verwenden Sie den folgenden einmaligen Bestätigungscode:",
    expirationText: "Dieser Code ist gültig für {{ .ExpiresIn }}.",
    securityNotice:
      "Falls Sie diese Anfrage nicht gestellt haben, ist keine Aktion erforderlich.",
  },
  passwordReset: {
    badgeText: "Sicherheit",
    heading: "Passwort zurücksetzen",
    description:
      "Wir haben eine Anfrage zum Zurücksetzen Ihres Passworts erhalten. Klicken Sie unten:",
    buttonText: "Passwort zurücksetzen",
    securityNoticeTitle: "Sicherheitshinweis",
    securityNoticeText:
      "Dieser Link läuft in {{ .ExpiresIn }} ab. Falls Sie die Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail.",
  },
  welcome: {
    badgeText: "Willkommen",
    heading: "Willkommen bei {{ .AppName }}",
    description:
      "Hallo {{ .UserName }}, Ihr Konto ist aktiviert und einsatzbereit.",
    buttonText: "Zum Dashboard",
    footerText: "Lassen Sie uns wissen, wenn Sie Fragen haben.",
    step1Title: "E-Mail bestätigt",
    step1Desc: "Ihre E-Mail-Adresse wurde erfolgreich bestätigt.",
    step2Title: "Arbeitsbereich einrichten",
    step2Desc: "Richten Sie Ihr Team und Ihre Einstellungen ein.",
    step3Title: "Starten",
    step3Desc: "Entdecken Sie die Komponenten und bauen Sie Ihre Produkte.",
  },
  notification: {
    badgeText: "Sicherheitswarnung",
    greeting: "Hallo {{ .UserName }},",
    actionText: "Aktivität überprüfen",
    sessionTitle: "Sitzungsdetails",
    deviceLabel: "Gerät",
    locationLabel: "Standort",
    ipLabel: "IP-Adresse",
    timeLabel: "Zeitstempel",
  },
  paymentCompleted: {
    badgeText: "Bezahlt",
    heading: "Zahlungsbeleg",
    description: "Ihre Zahlung für {{ .PlanName }} war erfolgreich.",
    orderIdLabel: "Rechnung",
    dateLabel: "Datum",
    planLabel: "Artikel",
    paymentMethodLabel: "Zahlungsart",
    subtotalLabel: "Zwischensumme",
    taxLabel: "MwSt.",
    amountLabel: "Gesamtbetrag",
    buttonText: "Rechnung herunterladen (PDF)",
  },
  magicLink: {
    badgeText: "Anmelden",
    heading: "Bei {{ .AppName }} anmelden",
    description: "Klicken Sie auf die Schaltfläche unten, um sich anzumelden:",
    buttonText: "Jetzt anmelden",
    securityNoticeTitle: "Sicherheitshinweis",
    securityNoticeText:
      "Dieser Link läuft in {{ .ExpiresIn }} ab und kann nur einmal verwendet werden.",
  },
  teamInvite: {
    badgeText: "Teameinladung",
    heading: "Arbeitsbereich beitreten",
    description:
      "{{ .InviterName }} hat Sie eingeladen, dem Arbeitsbereich {{ .WorkspaceName }} beizutreten.",
    roleLabel: "Rolle",
    workspaceLabel: "Arbeitsbereich",
    buttonText: "Einladung annehmen",
    declineText:
      "Wenn Sie diese Einladung nicht erwartet haben, ignorieren Sie diese E-Mail.",
  },
  subscriptionCanceled: {
    badgeText: "Abonnement",
    heading: "Abonnement gekündigt",
    description:
      "Ihr Abonnement für {{ .PlanName }} wurde gekündigt. Der Zugang bleibt bis zum Ende des aktuellen Abrechnungszeitraums aktiv.",
    expiryLabel: "Zugang endet am",
    planLabel: "Vorheriger Plan",
    reactivateButtonText: "Abonnement reaktivieren",
    feedbackText:
      "Wir würden uns freuen zu erfahren, wie wir uns verbessern können.",
  },
  apiKeyCreated: {
    badgeText: "Sicherheit",
    heading: "Neuer API-Schlüssel erstellt",
    description: "Ein neuer API-Schlüssel wurde für Ihr Konto erstellt.",
    keyNameLabel: "Schlüsselname",
    keyPrefixLabel: "Präfix",
    createdLabel: "Erstellt am",
    revokeButtonText: "API-Schlüssel verwalten",
    securityNotice: "Teilen Sie Ihre API-Schlüssel niemals öffentlich.",
  },
  usageLimitWarning: {
    badgeText: "Kontingentwarnung",
    heading: "Kontingentgrenze erreicht",
    description:
      "Sie haben {{ .UsagePercent }} Ihres monatlichen Kontingents auf {{ .AppName }} erreicht.",
    usageLabel: "Aktuelle Nutzung",
    limitLabel: "Monatliches Limit",
    resetDateLabel: "Zurücksetzung am",
    upgradeButtonText: "Plan upgraden",
  },
  feedbackRequest: {
    badgeText: "Feedback",
    heading: "Wie ist Ihre Erfahrung?",
    description:
      "Hallo {{ .UserName }}, wir würden uns über Ihr Feedback zu {{ .AppName }} freuen.",
    buttonText: "Feedback geben (2 Min.)",
    footerText: "Ihr Feedback hilft uns, das Produkt weiter zu verbessern.",
  },
  productUpdate: {
    badgeText: "Changelog",
    heading: "Neuigkeiten in {{ .AppName }} {{ .Version }}",
    description:
      "Hier sind die neuesten Funktionen und Verbesserungen dieser Version:",
    buttonText: "Vollständige Versionshinweise lesen",
  },
  paymentFailed: {
    badgeText: "Zahlung fehlgeschlagen",
    heading: "Zahlung nicht erfolgreich",
    description:
      "Ihre Zahlung für {{ .PlanName }} konnte nicht verarbeitet werden. Bitte aktualisieren Sie Ihre Zahlungsart.",
    amountLabel: "Fälliger Betrag",
    retryDateLabel: "Nächster Versuch",
    buttonText: "Zahlungsart aktualisieren",
    noticeText:
      "Wird die Zahlung nicht aktualisiert, kann Ihr Abonnement ausgesetzt werden.",
  },
  trialEnding: {
    badgeText: "Testphase",
    heading: "Testphase endet bald",
    description:
      "Ihre kostenlose Testphase für {{ .AppName }} {{ .PlanName }} endet in {{ .DaysLeft }} Tagen.",
    daysLeftLabel: "Verbleibende Zeit",
    expiryDateLabel: "Endet am",
    buttonText: "Auf Pro upgraden",
  },
  accountDeletion: {
    badgeText: "Kontohinweis",
    heading: "Kontolöschung geplant",
    description:
      "Ihre Anfrage zur Löschung Ihres Kontos wurde empfangen. Die Daten werden am {{ .ScheduledDate }} gelöscht.",
    scheduledDateLabel: "Löschdatum",
    cancelButtonText: "Löschung abbrechen",
    warningText:
      "Nach diesem Datum werden alle Arbeitsbereiche und Daten unwiderruflich gelöscht.",
  },
  twoFactorDisabled: {
    badgeText: "Kritische Sicherheit",
    heading: "Zwei-Faktor-Authentifizierung deaktiviert",
    description:
      "2FA wurde auf Ihrem Konto deaktiviert. Wenn Sie dies nicht autorisiert haben, sichern Sie Ihr Konto sofort.",
    actionText: "Konto sichern & 2FA aktivieren",
    securityWarning:
      "Das Deaktivieren der Zwei-Faktor-Authentifizierung verringert die Kontosicherheit erheblich.",
  },
  weeklyDigest: {
    badgeText: "Wöchentlicher Bericht",
    heading: "Ihre wöchentliche Übersicht",
    description:
      "Hier ist die Zusammenfassung Ihrer Aktivitäten der letzten 7 Tage:",
    buttonText: "Analytics öffnen",
  },
  orderShipped: {
    badgeText: "Versandt",
    heading: "Ihre Bestellung ist unterwegs",
    description:
      "Ihre Bestellung {{ .OrderID }} wurde versandt und ist auf dem Weg zu Ihnen.",
    trackingLabel: "Sendungsnummer",
    carrierLabel: "Versanddienstleister",
    estDeliveryLabel: "Voraussichtliche Lieferung",
    buttonText: "Sendung verfolgen",
  },
  deploySucceeded: {
    badgeText: "Bereitgestellt",
    heading: "Produktions-Deployment erfolgreich",
    description:
      "Ihr neuester Commit wurde erfolgreich gebaut und bereitgestellt.",
    branchLabel: "Branch",
    commitLabel: "Commit",
    durationLabel: "Bauzeit",
    buttonText: "Deployment ansehen",
  },
  deployFailed: {
    badgeText: "Baufehler",
    heading: "Deployment fehlgeschlagen",
    description:
      "Ihr Build ist während des Bereitstellungsschritts fehlgeschlagen.",
    branchLabel: "Branch",
    commitLabel: "Commit",
    errorLabel: "Fehlercode",
    buttonText: "Build-Logs ansehen",
  },
  commentMention: {
    badgeText: "Erwähnung",
    heading: "{{ .AuthorName }} hat Sie erwähnt",
    description:
      "{{ .AuthorName }} hat Sie in einer Diskussion auf {{ .TargetName }} markiert:",
    buttonText: "Auf Diskussion antworten",
  },
  emailChange: {
    badgeText: "E-Mail-Update",
    heading: "Neue E-Mail-Adresse bestätigen",
    description:
      "Wir haben eine Anfrage erhalten, Ihre E-Mail auf {{ .NewEmail }} zu ändern.",
    buttonText: "E-Mail-Änderung bestätigen",
    securityNotice:
      "Wenn Sie diese Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail.",
  },
  cartAbandonment: {
    badgeText: "Gespeicherter Warenkorb",
    heading: "Sie haben Artikel im Warenkorb",
    description:
      "Die Artikel in Ihrem Warenkorb sind für kurze Zeit reserviert.",
    totalLabel: "Warenkorbwert",
    buttonText: "Bestellung abschließen",
  },
  incidentReport: {
    badgeText: "Systemstatus",
    heading: "{{ .IncidentTitle }}",
    description:
      "Wir untersuchen derzeit einen Vorfall bei den {{ .AppName }}-Diensten.",
    statusLabel: "Aktueller Status",
    affectedLabel: "Betroffene Dienste",
    buttonText: "Statusseite ansehen",
  },
  dailyNewsletter: {
    badgeText: "Tagesüberblick",
    heading: "Täglicher Technologie-Überblick",
    description:
      "Ihre tägliche Zusammenfassung aus Softwarearchitektur und Open Source.",
    topStoryLabel: "Top-Thema",
    readMoreText: "Artikel lesen",
    curatedLabel: "Ausgewählte Highlights",
    footerNote:
      "Sie erhalten diesen Tagesüberblick als Abonnent von Limonify Daily.",
  },
  announcement: {
    badgeText: "Mitteilung",
    heading: "Wichtige Mitteilung: {{ .Subject }}",
    description:
      "Hallo {{ .UserName }}, wir haben eine wichtige Ankündigung bezüglich {{ .AppName }}:",
    buttonText: "Mehr erfahren",
  },
};
