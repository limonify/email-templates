<div align="center">
  <img src="https://limeui.limonify.com/lime-ui.png?v=5" width="48" height="48" alt="Limonify UI Logo" />
  <h1>@limonify/email-templates</h1>
  <p><strong>Design-system-first, production-grade email template suite for Go, Node.js, and Python backends.</strong></p>
  <p>Crafted with authentic <code>@limonify/ui</code> design tokens, mathematical OKLCH-to-sRGB CSS parsing, and built-in multi-language (i18n) support.</p>

  <p>
    <a href="https://www.npmjs.com/package/@limonify/email-templates"><img src="https://img.shields.io/npm/v/@limonify/email-templates?style=flat&color=facc15" alt="npm version" /></a>
    <a href="https://github.com/limonify/email-templates"><img src="https://img.shields.io/badge/TypeScript-7.0-blue?style=flat" alt="TypeScript 7" /></a>
    <a href="https://github.com/limonify/email-templates"><img src="https://img.shields.io/badge/Engine-Go%20%7C%20Node%20%7C%20Python-emerald?style=flat" alt="Supported Engines" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-gray?style=flat" alt="License" /></a>
  </p>
</div>

---

## ✨ Features

- 🖤 **Authentic Limonify UI Craft**: Precision double-frame cards, segmented OTP inputs, quiet status dot badges, and monochrome aesthetics matching `@limonify/ui` web and native components.
- 📧 **Bulletproof Email Client Compatibility**: Compiled down to table-based inline-styled HTML tested on Gmail, Apple Mail, Outlook (Word engine), and mobile email clients.
- 🎨 **Mathematical OKLCH CSS Color Parser**: Automatically translates modern CSS custom properties (`oklch(14.5% 0 0)`) from your theme stylesheet into cross-client static `#HEX` colors.
- ⚡ **Zero-Runtime Overhead in Production**: Pre-compiled localized templates (`/en/otp.html`, `/tr/otp.html`) allow Go, Python, and Node.js backends to render in `<1 ms` without runtime template compilation.
- 🌐 **Built-in Multi-Language (i18n)**: Out-of-the-box translations for **5 languages** (English, Turkish, German, Spanish, French) + 1-step custom language additions via `./locales/*.json`.
- 🖥️ **Live Interactive Preview Studio**: Built-in visual dashboard (`bun run preview`) with Dark/Light toggle, language switcher, mobile/desktop viewports, and 1-click HTML copy.

---

## 🚀 Quick Start

Run the interactive CLI generator without installing:

```bash
# Using Bun
bunx @limonify/email-templates

# Using NPM / NPX
npx @limonify/email-templates

# Using PNPM
pnpm dlx @limonify/email-templates
```

Or launch the **Live Interactive Preview Studio** at `http://localhost:3000`:

```bash
bunx @limonify/email-templates preview
```

---

## 📦 24 Production-Grade Templates

| Category                       | Template Name              | Template ID             | Description                                                 |
| :----------------------------- | :------------------------- | :---------------------- | :---------------------------------------------------------- |
| **Authentication & Security**  | OTP / 2FA Verification     | `otp`                   | Segmented 6-digit PIN input with expiration notice          |
|                                | Password Reset             | `password-reset`        | Secure password reset request with action button            |
|                                | Magic Link Sign In         | `magic-link`            | One-click passwordless authentication link                  |
|                                | Email Change Confirmation  | `email-change`          | Verification link to confirm new primary email address      |
|                                | Security / Session Alert   | `notification`          | Session details card with IP, device, and location          |
|                                | API Key Created            | `api-key-created`       | New token alert with prefix and revocation action           |
|                                | 2FA Disabled Alert         | `two-factor-disabled`   | Critical security alert when 2FA is removed from account    |
| **Developer & DevOps (CI/CD)** | Deployment Succeeded       | `deploy-succeeded`      | Production release notice with branch, commit, and duration |
|                                | Deployment Failed Alert    | `deploy-failed`         | CI/CD build failure alert with error terminal code block    |
|                                | Incident / Status Alert    | `incident-report`       | Operational incident update with impacted systems           |
| **Billing & Subscriptions**    | Payment Receipt / Invoice  | `payment-completed`     | Itemized invoice breakdown with PDF download action         |
|                                | Payment Failed / Dunning   | `payment-failed`        | Declined renewal payment notice with update billing action  |
|                                | Trial Ending Reminder      | `trial-ending`          | Free trial expiration countdown and upgrade notice          |
|                                | Subscription Canceled      | `subscription-canceled` | Cancellation notice with access period and reactivation     |
| **Team & Collaboration**       | Team / Workspace Invite    | `team-invite`           | Member invitation with role assignment and accept button    |
|                                | Comment / Mention Alert    | `comment-mention`       | Discussion mention with quote bubble and reply action       |
|                                | Account Deletion Scheduled | `account-deletion`      | 30-day grace period notice with restore account button      |
| **Product & Analytics**        | Welcome & Onboarding       | `welcome`               | New account onboarding with setup checklist                 |
|                                | Usage Quota Warning        | `usage-limit-warning`   | Monthly quota limit alert (80%/100%) with progress meter    |
|                                | Weekly Analytics Digest    | `weekly-digest`         | 7-day performance metrics and activity 2x2 grid             |
|                                | Product Update / Changelog | `product-update`        | Release announcement with categorized feature tags          |
| **E-Commerce & Orders**        | Order Shipped / Tracking   | `order-shipped`         | Delivery confirmation with tracking number and carrier      |
|                                | Abandoned Cart Reminder    | `cart-abandonment`      | Reserved items reminder with complete checkout button       |
|                                | Feedback / NPS Survey      | `feedback-request`      | Customer satisfaction feedback with 1-click survey          |

---

## 🐹 Go Backend Integration

The recommended, zero-overhead Go integration using standard library `embed.FS` and `html/template`:

```go
package main

import (
	"bytes"
	"embed"
	"fmt"
	"html/template"
	"log"
)

//go:embed templates/emails/*/*.html
var emailTemplatesFS embed.FS

type MailService struct {
	tmpl *template.Template
}

func NewMailService() (*MailService, error) {
	t, err := template.ParseFS(emailTemplatesFS, "templates/emails/*/*.html")
	if err != nil {
		return nil, fmt.Errorf("failed to parse email templates: %w", err)
	}
	return &MailService{tmpl: t}, nil
}

func (s *MailService) RenderEmail(locale, templateName string, data any) (string, error) {
	var buf bytes.Buffer
	targetPath := fmt.Sprintf("%s/%s.html", locale, templateName)

	err := s.tmpl.ExecuteTemplate(&buf, targetPath, data)
	if err != nil {
		// Fallback to English if locale template is not found
		fallbackPath := fmt.Sprintf("en/%s.html", templateName)
		err = s.tmpl.ExecuteTemplate(&buf, fallbackPath, data)
		if err != nil {
			return "", err
		}
	}
	return buf.String(), nil
}

func main() {
	mailer, err := NewMailService()
	if err != nil {
		log.Fatal(err)
	}

	// Type-safe data for OTP template
	data := map[string]any{
		"AppName":   "Limonify",
		"Code":      "849201",
		"ExpiresIn": "10 minutes",
	}

	html, err := mailer.RenderEmail("en", "otp", data)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Rendered HTML:", len(html), "bytes")
}
```

---

## 🟢 Node.js / TypeScript Integration

```ts
import {
  renderTemplateToHtml,
  defaultLimonifyDarkTheme,
  registerCustomLocale,
} from "@limonify/email-templates";

// 1. (Optional) Register custom translations or overrides
registerCustomLocale("it", {
  otp: {
    heading: "Codice di verifica",
    expirationText: "Scade in {{ .ExpiresIn }}",
  },
});

// 2. Render localized template to static HTML
const html = await renderTemplateToHtml(
  "team-invite",
  defaultLimonifyDarkTheme,
  "handlebars", // or 'go' | 'raw'
  {
    appName: "Limonify",
    logoUrl: "https://limeui.limonify.com/lime-ui.png?v=5",
  },
  {
    inviterName: "Sarah Connor",
    workspaceName: "Engineering",
    role: "Admin",
  },
  "en", // locale
);
```

---

## 🌐 Multi-Language (i18n) & Custom Locales

### Method 1: Adding JSON files to `./locales/` (Zero Config)

Create a `locales/` directory in your project root and drop any `{lang}.json` file:

```text
my-project/
├── locales/
│   ├── it.json    # Italian overrides
│   └── ja.json    # Japanese overrides
└── limonify-email.config.json
```

Example `locales/it.json`:

```json
{
  "otp": {
    "badgeText": "Sicurezza",
    "heading": "Codice di verifica",
    "description": "Usa questo codice monouso per completare l'accesso:"
  }
}
```

### Method 2: Via `limonify-email.config.json`

```json
{
  "locales": ["en", "tr", "de", "es", "fr", "it"],
  "translations": {
    "it": {
      "welcome": {
        "heading": "Benvenuto in {{ .AppName }}"
      }
    }
  }
}
```

> **Smart Fallback**: Any template or translation key omitted in your custom locale automatically falls back to standard English.

---

## ⚙️ Configuration Reference (`limonify-email.config.json`)

Generate a starter configuration file with `bunx @limonify/email-templates --init`:

```json
{
  "themeCssPath": "./src/styles.css",
  "mode": "dark",
  "engine": "go",
  "locales": ["en", "tr", "de", "es", "fr"],
  "outputDir": "./templates/emails",
  "theme": {
    "cardStyle": "double-frame",
    "radius": "14px"
  },
  "branding": {
    "appName": "{{ .AppName }}",
    "logoUrl": "https://limeui.limonify.com/lime-ui.png?v=5",
    "logoWidth": 26,
    "logoHeight": 26,
    "supportUrl": "https://example.com/support",
    "supportText": "Have questions?",
    "copyrightText": "© 2026 Limonify. All rights reserved.",
    "socialLinks": [
      { "platform": "github", "url": "https://github.com/limonify" },
      { "platform": "twitter", "url": "https://twitter.com/limonify" }
    ]
  }
}
```

---

## 📄 License

MIT © [limonify](https://ui.limonify.com)
