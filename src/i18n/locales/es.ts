import type { EmailLocaleDictionary } from "../types.js";

export const esLocale: EmailLocaleDictionary = {
  layout: {
    supportText: "¿Tiene preguntas o necesita ayuda?",
    contactSupport: "Contactar con soporte",
    allRightsReserved: "Todos los derechos reservados.",
    unsubscribe: "Darse de baja",
  },
  otp: {
    badgeText: "Código de verificación",
    heading: "Verificación de inicio de sesión",
    description: "Utilice el siguiente código de verificación de un solo uso:",
    expirationText: "Este código caduca en {{ .ExpiresIn }}.",
    securityNotice: "Si no solicitó este código, puede ignorar este correo.",
  },
  passwordReset: {
    badgeText: "Seguridad",
    heading: "Restablecer su contraseña",
    description:
      "Recibimos una solicitud para restablecer su contraseña. Haga clic a continuación:",
    buttonText: "Restablecer contraseña",
    securityNoticeTitle: "Aviso de seguridad",
    securityNoticeText: "Este enlace caducará en {{ .ExpiresIn }}.",
  },
  welcome: {
    badgeText: "Bienvenido",
    heading: "Bienvenido a {{ .AppName }}",
    description: "Hola {{ .UserName }}, tu cuenta está lista para usarse.",
    buttonText: "Ir al panel de control",
    footerText: "Avísanos si necesitas ayuda.",
    step1Title: "Correo verificado",
    step1Desc: "Tu dirección de correo electrónico ha sido confirmada.",
    step2Title: "Configuración del espacio",
    step2Desc: "Configura tu equipo y preferencias de espacio de trabajo.",
    step3Title: "Comenzar a crear",
    step3Desc: "Explora los componentes y comienza a construir.",
  },
  notification: {
    badgeText: "Aviso de seguridad",
    greeting: "Hola {{ .UserName }},",
    actionText: "Revisar actividad",
    sessionTitle: "Detalles de la sesión",
    deviceLabel: "Dispositivo",
    locationLabel: "Ubicación",
    ipLabel: "Dirección IP",
    timeLabel: "Marca de tiempo",
  },
  paymentCompleted: {
    badgeText: "Pagado",
    heading: "Recibo de pago",
    description: "Su pago por {{ .PlanName }} se ha procesado con éxito.",
    orderIdLabel: "Factura",
    dateLabel: "Fecha",
    planLabel: "Artículo",
    paymentMethodLabel: "Método de pago",
    subtotalLabel: "Subtotal",
    taxLabel: "Impuestos",
    amountLabel: "Total pagado",
    buttonText: "Descargar factura (PDF)",
  },
  magicLink: {
    badgeText: "Iniciar sesión",
    heading: "Iniciar sesión en {{ .AppName }}",
    description: "Haga clic en el botón a continuación para iniciar sesión:",
    buttonText: "Iniciar sesión en la cuenta",
    securityNoticeTitle: "Aviso de seguridad",
    securityNoticeText: "Este enlace caducará en {{ .ExpiresIn }}.",
  },
  teamInvite: {
    badgeText: "Invitación de equipo",
    heading: "Unirse al espacio de trabajo",
    description:
      "{{ .InviterName }} te ha invitado a unirte al espacio de trabajo {{ .WorkspaceName }}.",
    roleLabel: "Rol asignado",
    workspaceLabel: "Espacio de trabajo",
    buttonText: "Aceptar invitación",
    declineText: "Si no esperabas esta invitación, puedes ignorar este correo.",
  },
  subscriptionCanceled: {
    badgeText: "Suscripción",
    heading: "Suscripción cancelada",
    description:
      "Tu suscripción para {{ .PlanName }} ha sido cancelada. Tu acceso continuará hasta el final del periodo de facturación actual.",
    expiryLabel: "El acceso expira el",
    planLabel: "Plan anterior",
    reactivateButtonText: "Reactivar suscripción",
    feedbackText: "Nos encantaría saber cómo podemos mejorar.",
  },
  apiKeyCreated: {
    badgeText: "Seguridad",
    heading: "Nueva clave de API creada",
    description: "Se creó una nueva clave de API para tu cuenta.",
    keyNameLabel: "Nombre de la clave",
    keyPrefixLabel: "Prefijo",
    createdLabel: "Creado el",
    revokeButtonText: "Gestionar claves de API",
    securityNotice: "Nunca compartas tus claves de API públicamente.",
  },
  usageLimitWarning: {
    badgeText: "Alerta de uso",
    heading: "Alerta de límite de cuota",
    description:
      "Has alcanzado el {{ .UsagePercent }} de tu cuota mensual en {{ .AppName }}.",
    usageLabel: "Uso actual",
    limitLabel: "Límite mensual",
    resetDateLabel: "Reinicio de cuota el",
    upgradeButtonText: "Mejorar plan",
  },
  feedbackRequest: {
    badgeText: "Opinión",
    heading: "¿Cómo ha sido tu experiencia?",
    description:
      "Hola {{ .UserName }}, nos gustaría conocer tu opinión sobre {{ .AppName }}.",
    buttonText: "Compartir opinión (2 min)",
    footerText: "Tus comentarios nos ayudan a mejorar el producto.",
  },
  productUpdate: {
    badgeText: "Novedades",
    heading: "Novedades en {{ .AppName }} {{ .Version }}",
    description: "Estas son las últimas funciones y mejoras de esta versión:",
    buttonText: "Leer notas de la versión",
  },
  paymentFailed: {
    badgeText: "Pago fallido",
    heading: "Pago no procesado",
    description:
      "No pudimos procesar su pago de {{ .Amount }} para {{ .PlanName }}. Por favor, actualice su método de pago.",
    amountLabel: "Importe adeudado",
    retryDateLabel: "Próximo intento",
    buttonText: "Actualizar método de pago",
    noticeText:
      "Si no actualiza los datos de pago, su suscripción podría suspenderse.",
  },
  trialEnding: {
    badgeText: "Fin de prueba",
    heading: "Tu prueba gratuita termina pronto",
    description:
      "Tu periodo de prueba para {{ .AppName }} {{ .PlanName }} caducará en {{ .DaysLeft }} días.",
    daysLeftLabel: "Tiempo restante",
    expiryDateLabel: "Termina el",
    buttonText: "Mejorar a Pro",
  },
  accountDeletion: {
    badgeText: "Alerta de cuenta",
    heading: "Eliminación de cuenta programada",
    description:
      "Hemos recibido tu solicitud para eliminar tu cuenta. La eliminación se completará el {{ .ScheduledDate }}.",
    scheduledDateLabel: "Fecha de eliminación",
    cancelButtonText: "Cancelar eliminación",
    warningText:
      "Tras esta fecha, todos los datos y espacios de trabajo se eliminarán de forma permanente.",
  },
  twoFactorDisabled: {
    badgeText: "Seguridad crítica",
    heading: "Autenticación en dos pasos desactivada",
    description:
      "La autenticación 2FA se ha desactivado en tu cuenta de {{ .AppName }}. Si no lo autorizaste, asegura tu cuenta de inmediato.",
    actionText: "Asegurar cuenta y activar 2FA",
    securityWarning:
      "Desactivar la autenticación en dos pasos reduce significativamente la seguridad de tu cuenta.",
  },
  weeklyDigest: {
    badgeText: "Resumen semanal",
    heading: "Tu resumen semanal",
    description:
      "Aquí tienes un resumen de la actividad de tu espacio de trabajo en los últimos 7 días:",
    buttonText: "Abrir panel de análisis",
  },
  orderShipped: {
    badgeText: "Enviado",
    heading: "Tu pedido está en camino",
    description:
      "Tu pedido {{ .OrderID }} ha sido enviado y se encuentra en camino.",
    trackingLabel: "Número de seguimiento",
    carrierLabel: "Transportista",
    estDeliveryLabel: "Entrega estimada",
    buttonText: "Rastrear envío",
  },
  deploySucceeded: {
    badgeText: "Desplegado",
    heading: "Despliegue en producción exitoso",
    description: "Tu último commit se ha compilado y desplegado con éxito.",
    branchLabel: "Rama",
    commitLabel: "Commit",
    durationLabel: "Tiempo de compilación",
    buttonText: "Ver despliegue",
  },
  deployFailed: {
    badgeText: "Fallo de compilación",
    heading: "Error en el despliegue",
    description: "El despliegue ha fallado durante la fase de compilación.",
    branchLabel: "Rama",
    commitLabel: "Commit",
    errorLabel: "Estado de error",
    buttonText: "Ver registros de error",
  },
  commentMention: {
    badgeText: "Mención",
    heading: "{{ .AuthorName }} te ha mencionado",
    description:
      "{{ .AuthorName }} te ha etiquetado en una conversación en {{ .TargetName }}:",
    buttonText: "Responder en el hilo",
  },
  emailChange: {
    badgeText: "Cambio de correo",
    heading: "Confirma tu nueva dirección de correo",
    description:
      "Hemos recibido una solicitud para cambiar tu correo a {{ .NewEmail }}.",
    buttonText: "Confirmar nuevo correo",
    securityNotice: "Si no solicitaste este cambio, ignora este mensaje.",
  },
  cartAbandonment: {
    badgeText: "Carrito guardado",
    heading: "Olvidaste productos en tu carrito",
    description:
      "Los artículos de tu carrito están reservados por tiempo limitado.",
    totalLabel: "Total del carrito",
    buttonText: "Finalizar compra",
  },
  incidentReport: {
    badgeText: "Aviso de estado",
    heading: "{{ .IncidentTitle }}",
    description:
      "Estamos investigando una incidencia que afecta a los servicios de {{ .AppName }}.",
    statusLabel: "Estado actual",
    affectedLabel: "Servicios afectados",
    buttonText: "Ver página de estado",
  },
  dailyNewsletter: {
    badgeText: "Resumen Diario",
    heading: "Resumen Diario de Tecnología",
    description:
      "Tu selección diaria de novedades sobre arquitectura de software y código abierto.",
    topStoryLabel: "Tema Principal",
    readMoreText: "Leer artículo",
    curatedLabel: "Noticias Destacadas",
    footerNote: "Recibes este boletín porque estás suscrito a Limonify Daily.",
  },
  announcement: {
    badgeText: "Anuncio",
    heading: "Actualización Importante: {{ .Subject }}",
    description:
      "Hola {{ .UserName }}, tenemos un anuncio importante sobre {{ .AppName }}:",
    buttonText: "Más información",
  },
};
