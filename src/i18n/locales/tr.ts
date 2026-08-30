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
  teamInvite: {
    badgeText: "Ekip daveti",
    heading: "Çalışma alanına katılın",
    description:
      "{{ .InviterName }}, sizi {{ .AppName }} üzerindeki {{ .WorkspaceName }} çalışma alanına katılmaya davet etti.",
    roleLabel: "Atanan rol",
    workspaceLabel: "Çalışma alanı",
    buttonText: "Daveti kabul et",
    declineText:
      "Bu daveti beklemiyorsanız bu e-postayı güvenle yok sayabilirsiniz.",
  },
  subscriptionCanceled: {
    badgeText: "Abonelik",
    heading: "Abonelik iptal edildi",
    description:
      "{{ .PlanName }} aboneliğiniz iptal edildi. Mevcut fatura döneminiz sonuna kadar erişiminiz devam edecektir.",
    expiryLabel: "Erişim bitiş tarihi",
    planLabel: "Önceki plan",
    reactivateButtonText: "Aboneliği yeniden başlat",
    feedbackText:
      "Geliştirmemiz gereken konuları bilmek isteriz. Düşüncelerinizi bizimle paylaşırsanız seviniriz.",
  },
  apiKeyCreated: {
    badgeText: "Güvenlik",
    heading: "Yeni API anahtarı oluşturuldu",
    description:
      "Hesabınız için yeni bir API anahtarı oluşturuldu. Bu işlemi siz yapmadıysanız anahtarı derhal iptal edin.",
    keyNameLabel: "Anahtar adı",
    keyPrefixLabel: "Anahtar ön eki",
    createdLabel: "Oluşturulma tarihi",
    revokeButtonText: "API anahtarlarını yönet",
    securityNotice:
      "API anahtarlarınızı asla genel repolara veya herkese açık yerlere eklemeyin.",
  },
  usageLimitWarning: {
    badgeText: "Kullanım uyarısı",
    heading: "Kota limit uyarısı",
    description:
      "{{ .AppName }} üzerindeki aylık {{ .MetricName }} kotanızın %{{ .UsagePercent }}'ine ulaştınız.",
    usageLabel: "Mevcut kullanım",
    limitLabel: "Aylık limit",
    resetDateLabel: "Kota sıfırlanma tarihi",
    upgradeButtonText: "Planı yükselt",
  },
  feedbackRequest: {
    badgeText: "Geri bildirim",
    heading: "Deneyiminiz nasıldı?",
    description:
      "Merhaba {{ .UserName }}, şu ana kadarki {{ .AppName }} deneyiminiz hakkındaki görüşlerinizi duymak isteriz.",
    buttonText: "Geri bildirim paylaş (2 dk)",
    footerText:
      "Geri bildirimleriniz ürün yol haritamızı doğrudan şekillendirmektedir. Teşekkür ederiz.",
  },
  productUpdate: {
    badgeText: "Güncelleme",
    heading: "{{ .AppName }} {{ .Version }} ile Yenilikler",
    description:
      "Bu sürümde yayınlanan en son özellikler, iyileştirmeler ve güncellemeler:",
    buttonText: "Tüm sürüm notlarını oku",
  },
};
