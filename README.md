# @limonify/email-templates

> Limonify UI tasarım sistemiyle tam uyumlu, CSS tema dosyanızı doğrudan okuyup Go, Node.js ve Python backend projeleriniz için saf HTML e-posta şablonları üreten modern CLI aracı.

---

## 🚀 Hızlı Başlangıç

Kurulum gerektirmeden doğrudan çalıştırın:

```bash
# Bun ile
bunx @limonify/email-templates

# veya NPM ile
npx @limonify/email-templates
```

---

## ✨ Özellikler

- **🎨 CSS Değişkeni / Tema Entegrasyonu**: Web projenizin `styles.css` (Tailwind / CSS Variables) dosyasını okur, renk kodlarını (OKLCH, HEX, RGB, HSL) e-posta istemcileriyle uyumlu HEX kodlarına dönüştürür.
- **⚡ Popüler Backend Motorları**:
  - **Go template** (`{{ .AppName }}`, `{{ .Code }}`, `{{ .ResetURL }}`)
  - **Handlebars / Mustache / Jinja** (`{{ appName }}`, `{{ code }}`)
  - **Raw Placeholders** (`__APP_NAME__`, `__CODE__`)
- **📱 E-posta İstemci Uyumluluğu**: Gmail, Apple Mail, Outlook ve mobil istemcilerde tam uyumlu responsive HTML tabloları üretir.
- **🛠️ Hazır Şablonlar**:
  - 🔑 **OTP / Doğrulama Kodu**: 2FA ve e-posta doğrulama.
  - 🔄 **Şifre Sıfırlama**: Güvenli şifre sıfırlama bağlantısı.
  - 🎉 **Hoş Geldiniz (Welcome)**: Yeni kullanıcı karşılama ve onboarding.
  - 🔔 **Hesap Bildirimi**: Güvenlik ve sistem bilgilendirmeleri.
  - 💳 **Ödeme Onayı & Fatura**: Sipariş detayları tablosu ve makbuz indirme.
  - ✨ **Magic Link**: Şifresiz tek tıkla oturum açma bağlantısı.

---

## 🐹 Go Backend Entegrasyon Örneği

Oluşturulan `otp.html` şablonunu Go standart kütüphanesiyle (`html/template`) kullanın:

```go
package main

import (
	"bytes"
	"fmt"
	"html/template"
)

type OTPEmailData struct {
	AppName   string
	Code      string
	ExpiresIn string
}

func main() {
	tmpl, err := template.ParseFiles("templates/emails/otp.html")
	if err != nil {
		panic(err)
	}

	data := OTPEmailData{
		AppName:   "Limonify",
		Code:      "849201",
		ExpiresIn: "10 dakika",
	}

	var body bytes.Buffer
	if err := tmpl.Execute(&body, data); err != nil {
		panic(err)
	}

	fmt.Println("E-posta HTML Hazır:", body.Len(), "bytes")
}
```

---

## 📦 TypeScript / Programatik Kullanım

```ts
import { parseCssFile, renderTemplateToHtml } from '@limonify/email-templates'

// 1. CSS temasını ayrıştır
const theme = parseCssFile('./src/styles.css', 'dark')

// 2. HTML çıktısı üret
const html = await renderTemplateToHtml('otp', theme, 'go')
```

---

## 📄 Lisans

MIT © [limonify](https://ui.limonify.com)
