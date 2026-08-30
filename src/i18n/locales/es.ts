import type { EmailLocaleDictionary } from "../types.js";

export const esLocale: EmailLocaleDictionary = {
  layout: {
    supportText: "¿Tiene preguntas o necesita ayuda?",
    contactSupport: "Contactar con Soporte",
    allRightsReserved: "Todos los derechos reservados.",
    unsubscribe: "Darse de baja de los correos",
  },
  otp: {
    badgeText: "Verificación de Seguridad",
    heading: "Código de Verificación",
    description:
      "Utilice el siguiente código de verificación de un solo uso para iniciar sesión de forma segura:",
    expirationText: "Este código es válido durante {{ .ExpiresIn }}.",
    securityNotice:
      "Si no solicitó este código, no se requiere ninguna acción y puede ignorar este correo.",
  },
  passwordReset: {
    badgeText: "Seguridad de la Cuenta",
    heading: "Restablecer su Contraseña",
    description:
      "Hola {{ .UserName }}, recibimos una solicitud para restablecer su contraseña. Haga clic en el botón a continuación:",
    buttonText: "Restablecer Contraseña →",
    securityNoticeTitle: "Aviso de Seguridad",
    securityNoticeText:
      "Este enlace caducará en {{ .ExpiresIn }}. Si no realizó esta solicitud, su cuenta permanece segura.",
  },
  welcome: {
    badgeText: "Bienvenido a Bordo",
    heading: "¡Bienvenido a {{ .AppName }}! ✨",
    description:
      "Hola {{ .UserName }}, estamos encantados de tenerte con nosotros. Tu cuenta está lista.",
    buttonText: "Ir al Panel de Control →",
    footerText: "¡Explora nuestros componentes y avísanos si necesitas ayuda!",
    step1Title: "Verifica tu Correo",
    step1Desc: "Tu dirección de correo electrónico ha sido confirmada.",
    step2Title: "Completa tu Perfil",
    step2Desc: "Configura tu espacio de trabajo y preferencias.",
    step3Title: "Comienza a Construir",
    step3Desc: "Explora la biblioteca de componentes y crea tus proyectos.",
  },
  notification: {
    badgeText: "Alerta de Seguridad",
    greeting: "Hola {{ .UserName }},",
    actionText: "Revisar Actividad de Seguridad →",
    sessionTitle: "Detalles del Dispositivo y Sesión",
    deviceLabel: "Dispositivo / SO:",
    locationLabel: "Ubicación:",
    ipLabel: "Dirección IP:",
    timeLabel: "Hora:",
  },
  paymentCompleted: {
    badgeText: "Pago Confirmado",
    heading: "¡Gracias por su Pedido!",
    description:
      "Hola {{ .UserName }}, su pago por {{ .PlanName }} se ha procesado con éxito. Aquí está su recibo:",
    orderIdLabel: "ID de Factura",
    dateLabel: "Fecha de Facturación",
    planLabel: "Plan / Suscripción",
    paymentMethodLabel: "Método de Pago",
    subtotalLabel: "Subtotal",
    taxLabel: "Impuestos / IVA",
    amountLabel: "Total Pagado",
    buttonText: "Descargar Factura (PDF) →",
  },
  magicLink: {
    badgeText: "Inicio de Sesión Rápido",
    heading: "Iniciar Sesión en {{ .AppName }}",
    description:
      "Haga clic en el botón a continuación para iniciar sesión en su cuenta sin contraseña:",
    buttonText: "Iniciar Sesión al Instante →",
    securityNoticeTitle: "Aviso de Seguridad",
    securityNoticeText:
      "Este enlace de un solo uso caducará en {{ .ExpiresIn }}. Si no lo solicitó, puede ignorarlo.",
  },
};
