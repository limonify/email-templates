import type { EmailLocaleDictionary } from "../types.js";

export const trLocale: EmailLocaleDictionary = {
  layout: {
    supportText: "Sorularınız mı var veya yardıma mı ihtiyacınız var?",
    contactSupport: "Destek Ekibine Ulaşın",
    allRightsReserved: "Tüm hakları saklıdır.",
    unsubscribe: "E-posta bildirimlerinden ayrıl",
  },
  otp: {
    badgeText: "Güvenlik Doğrulaması",
    heading: "Giriş Doğrulama Kodu",
    description:
      "Hesabınıza güvenle giriş yapmak veya işleminizi tamamlamak için aşağıdaki tek kullanımlık doğrulama kodunu kullanın:",
    expirationText: "Bu kod {{ .ExpiresIn }} boyunca geçerlidir.",
    securityNotice:
      "Bu talebi siz başlatmadıysanız hiçbir işlem yapmanıza gerek yoktur; bu e-postayı güvenle yok sayabilirsiniz.",
  },
  passwordReset: {
    badgeText: "Hesap Güvenliği",
    heading: "Şifrenizi Sıfırlayın",
    description:
      "Merhaba {{ .UserName }}, hesabınız için bir şifre sıfırlama talebi aldık. Yeni bir şifre belirlemek için aşağıdaki butona tıklayın:",
    buttonText: "Şifremi Sıfırla →",
    securityNoticeTitle: "Güvenlik Uyarısı",
    securityNoticeText:
      "Bu sıfırlama bağlantısının süresi {{ .ExpiresIn }} içinde dolacaktır. Talebi siz oluşturmadıysanız hesabınız güvendedir.",
  },
  welcome: {
    badgeText: "Aramıza Hoş Geldiniz",
    heading: "{{ .AppName }}'e Hoş Geldiniz! ✨",
    description:
      "Merhaba {{ .UserName }}, aramızda olmanızdan dolayı çok mutluyuz. Hesabınız aktif edildi ve kullanıma hazır.",
    buttonText: "Panele Git →",
    footerText:
      "Bileşenlerimizi keşfedin, temalarınızı özelleştirin ve yardıma ihtiyacınız olursa bizimle iletişime geçmekten çekinmeyin!",
    step1Title: "E-postanızı Doğrulayın",
    step1Desc: "E-posta adresiniz başarıyla onaylandı ve doğrulandı.",
    step2Title: "Profilinizi Tamamlayın",
    step2Desc:
      "Çalışma alanınızı, ekip üyelerinizi ve tercihlerinizi yapılandırın.",
    step3Title: "Geliştirmeye Başlayın",
    step3Desc:
      "Bileşen kütüphanesini keşfedin ve projelerinizi hızlıca canlıya alın.",
  },
  notification: {
    badgeText: "Güvenlik Bildirimi",
    greeting: "Merhaba {{ .UserName }},",
    actionText: "Güvenlik Aktivitesini İncele →",
    sessionTitle: "Cihaz & Oturum Bilgileri",
    deviceLabel: "Cihaz / İşletim Sistemi:",
    locationLabel: "Konum:",
    ipLabel: "IP Adresi:",
    timeLabel: "Zaman:",
  },
  paymentCompleted: {
    badgeText: "Ödeme Onaylandı",
    heading: "Siparişiniz İçin Teşekkür Ederiz!",
    description:
      "Merhaba {{ .UserName }}, {{ .PlanName }} için ödemeniz başarıyla alındı. Fatura özetiniz aşağıda yer almaktadır:",
    orderIdLabel: "Fatura No",
    dateLabel: "Fatura Tarihi",
    planLabel: "Plan / Abonelik",
    paymentMethodLabel: "Ödeme Yöntemi",
    subtotalLabel: "Ara Toplam",
    taxLabel: "KDV",
    amountLabel: "Toplam Ödenen",
    buttonText: "Faturayı İndir (PDF) →",
  },
  magicLink: {
    badgeText: "Hızlı Giriş",
    heading: "{{ .AppName }}'e Giriş Yapın",
    description:
      "Şifre girmeden {{ .AppName }} hesabınıza güvenle giriş yapmak için aşağıdaki bağlantıya tıklayın:",
    buttonText: "Hemen Giriş Yap →",
    securityNoticeTitle: "Güvenlik Uyarısı",
    securityNoticeText:
      "Bu tek kullanımlık sihirli bağlantı {{ .ExpiresIn }} içinde geçerliliğini yitirecektir. Talebi siz yapmadıysanız görmezden gelebilirsiniz.",
  },
};
