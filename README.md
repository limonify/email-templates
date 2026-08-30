# @limonify/email-templates

> 100% customizable, design-system-first email template generator for Go, Node.js, and Python backends — styled with Limonify UI design tokens and automatic CSS theme parsing.

---

## 🚀 Quick Start

Run instantly without installing:

```bash
# Using Bun
bunx @limonify/email-templates

# Using NPM
npx @limonify/email-templates
```

Or initialize a configuration file to customize every single text, variable, logo, and color:

```bash
bunx @limonify/email-templates --init
```

---

## ⚙️ Total Customization (`limonify-email.config.json`)

You can customize every single heading, paragraph, button text, logo, variable name (`{{ .CustomVar }}`), and layout style by creating a `limonify-email.config.json`:

```json
{
  "themeCssPath": "./src/styles.css",
  "mode": "dark",
  "engine": "go",
  "outputDir": "./templates/emails",
  "theme": {
    "cardStyle": "double-frame",
    "radius": "14px"
  },
  "branding": {
    "appName": "MyBrand",
    "logoUrl": "https://example.com/logo.png",
    "logoWidth": 36,
    "logoHeight": 36,
    "supportUrl": "https://example.com/support",
    "supportText": "Need help with your account?",
    "copyrightText": "© 2026 MyBrand Inc. All rights reserved.",
    "socialLinks": [
      { "platform": "github", "url": "https://github.com/mybrand" },
      { "platform": "twitter", "url": "https://twitter.com/mybrand" }
    ]
  },
  "templates": {
    "otp": {
      "badgeText": "Security Verification",
      "heading": "Your One-Time Passcode",
      "description": "Enter the verification code below to access your account:",
      "code": "{{ .OTPCode }}",
      "expiresIn": "{{ .ExpiresIn }}"
    },
    "passwordReset": {
      "badgeText": "Account Security",
      "heading": "Reset Your Password",
      "userName": "{{ .User.FullName }}",
      "resetUrl": "{{ .ResetLink }}",
      "buttonText": "Change My Password →"
    }
  }
}
```

---

## ✨ Features

- **🎨 Automatic CSS Theme Parser**: Provide your web app's `styles.css` (Tailwind / CSS Variables), and the generator automatically converts color formats (OKLCH, HEX, RGB, HSL) into cross-client inline HEX styles.
- **🖼️ Flexible Card Styles**:
  - `double-frame`: Signature Limonify UI double-frame card with subtle glow.
  - `single`: Classic solid card with border and elevation.
  - `minimal`: Clean flat layout without card borders.
- **⚡ Backend Template Engines**:
  - **Go template** (`{{ .AppName }}`, `{{ .Code }}`, `{{ .ResetURL }}`)
  - **Handlebars / Mustache / Jinja** (`{{ appName }}`, `{{ code }}`)
  - **Raw Placeholders** (`__APP_NAME__`, `__CODE__`)
- **📱 100% Cross-Client Compatibility**: Generates responsive, table-based HTML tested across Gmail, Apple Mail, Outlook, and mobile clients.
- **🛠️ Built-in Templates**:
  - 🔑 **OTP / Verification Code**: 2FA and one-time sign-in code.
  - 🔄 **Password Reset**: Secure password reset request with action button.
  - 🎉 **Welcome & Onboarding**: New account onboarding message.
  - 🔔 **Account Notification**: General alerts, security notices, and status updates.
  - 💳 **Payment Completed & Invoice**: Order summary table with invoice download button.
  - ✨ **Magic Link**: One-click passwordless authentication link.

---

## 🐹 Go Backend Integration Example

Use the generated `otp.html` template directly with Go's standard `html/template` library:

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
		ExpiresIn: "10 minutes",
	}

	var body bytes.Buffer
	if err := tmpl.Execute(&body, data); err != nil {
		panic(err)
	}

	fmt.Println("Rendered Email HTML Size:", body.Len(), "bytes")
}
```

---

## 📦 TypeScript / Programmatic Usage

You can also use the package programmatically:

```ts
import { parseCssFile, renderTemplateToHtml } from "@limonify/email-templates";

// 1. Parse your web app's theme
const theme = parseCssFile("./src/styles.css", "dark");

// 2. Render to pure HTML with custom props
const html = await renderTemplateToHtml(
  "otp",
  theme,
  "go",
  {
    appName: "Limonify",
    logoUrl: "https://example.com/logo.png",
  },
  {
    code: "{{ .CustomOTP }}",
    heading: "Your Passcode",
  },
);
```

---

## 📄 License

MIT © [limonify](https://ui.limonify.com)
