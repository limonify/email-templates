import type { EmailLocaleDictionary } from "../types.js";

export const trLocale: EmailLocaleDictionary = {
  layout: {
    supportText: "Sorularınız mı var veya yardıma mı ihtiyacınız var?",
    contactSupport: "Destek ekibine ulaşın",
    allRightsReserved: "Tüm hakları saklıdır.",
    unsubscribe: "E-posta bildirimlerinden ayrıl",
  },
  otp: {
    badgeText: "Doğrulama kodu",
    heading: "Giriş doğrulaması",
    description:
      "Giriş işleminizi tamamlamak için aşağıdaki tek kullanımlık güvenlik kodunu kullanın:",
    expirationText: "Bu kod {{ .ExpiresIn }} geçerlidir.",
    securityNotice:
      "Bu talebi siz yapmadıysanız bu e-postayı güvenle yok sayabilirsiniz.",
  },
  passwordReset: {
    badgeText: "Güvenlik",
    heading: "Şifrenizi sıfırlayın",
    description:
      "Hesabınız için bir şifre sıfırlama talebi aldık. Devam etmek için aşağıdaki butona tıklayın:",
    buttonText: "Şifreyi sıfırla",
    securityNoticeTitle: "Güvenlik notu",
    securityNoticeText:
      "Bu bağlantı {{ .ExpiresIn }} geçerlidir. Şifre sıfırlama talebinde bulunmadıysanız işlem yapmanız gerekmez.",
  },
  welcome: {
    badgeText: "Hoş geldiniz",
    heading: "{{ .AppName }}'e hoş geldiniz",
    description:
      "Merhaba {{ .UserName }}, hesabınız hazır ve kullanıma açıldı.",
    buttonText: "Panele git",
    footerText: "Herhangi bir sorunuz olursa bizimle iletişime geçebilirsiniz.",
    step1Title: "E-posta doğrulandı",
    step1Desc: "Birincil e-posta adresiniz başarıyla onaylandı.",
    step2Title: "Çalışma alanı kurulumu",
    step2Desc: "Ekibinizi ve varsayılan tercihlerinizi yapılandırın.",
    step3Title: "Geliştirmeye başlayın",
    step3Desc: "Bileşen kütüphanesini keşfedin ve projelerinizi geliştirin.",
  },
  notification: {
    badgeText: "Güvenlik bildirimi",
    greeting: "Merhaba {{ .UserName }},",
    actionText: "Aktiviteyi incele",
    sessionTitle: "Oturum detayları",
    deviceLabel: "Cihaz",
    locationLabel: "Konum",
    ipLabel: "IP adresi",
    timeLabel: "Zaman damgası",
  },
  paymentCompleted: {
    badgeText: "Ödendi",
    heading: "Ödeme makbuzu",
    description: "{{ .PlanName }} için ödemeniz başarıyla alındı.",
    orderIdLabel: "Fatura",
    dateLabel: "Tarih",
    planLabel: "Hizmet",
    paymentMethodLabel: "Ödeme yöntemi",
    subtotalLabel: "Ara toplam",
    taxLabel: "KDV",
    amountLabel: "Toplam ödenen",
    buttonText: "Faturayı indir (PDF)",
  },
  magicLink: {
    badgeText: "Giriş yap",
    heading: "{{ .AppName }}'e giriş yapın",
    description: "Şifresiz giriş yapmak için aşağıdaki butona tıklayın:",
    buttonText: "Hesaba giriş yap",
    securityNoticeTitle: "Güvenlik notu",
    securityNoticeText:
      "Bu tek kullanımlık bağlantı {{ .ExpiresIn }} geçerlidir. Talebi siz yapmadıysanız yok sayabilirsiniz.",
  },
};
