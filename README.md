# @limonify/email-templates

> Production-grade, design-system-first email template suite for Go, Node.js, and Python backends — crafted with `@limonify/ui` tokens, automatic OKLCH CSS theme parsing, and built-in multi-language (i18n) support.

---

## 🚀 Quick Start

Run instantly without installing:

```bash
# Using Bun
bunx @limonify/email-templates

# Using NPM
npx @limonify/email-templates
```

Or start the live interactive preview studio:

```bash
bunx @limonify/email-templates preview
```

---

## 📦 12 Core Production Templates

| Category             | Template                   | ID                      | Description                                                   |
| :------------------- | :------------------------- | :---------------------- | :------------------------------------------------------------ |
| **Auth & Security**  | OTP / 2FA Code             | `otp`                   | Segmented 6-digit verification code with expiration note      |
|                      | Password Reset             | `password-reset`        | Secure password reset request with action button              |
|                      | Magic Link Sign In         | `magic-link`            | One-click passwordless authentication link                    |
|                      | Security / Session Alert   | `notification`          | New sign-in alert with IP, device, and location details       |
| **Billing & Team**   | Payment Receipt / Invoice  | `payment-completed`     | Itemized invoice breakdown with PDF download action           |
|                      | Team / Workspace Invite    | `team-invite`           | Member invitation with role assignment and accept button      |
|                      | Subscription Canceled      | `subscription-canceled` | Cancellation confirmation with access period and reactivation |
|                      | API Key Created            | `api-key-created`       | New token alert with prefix and revocation button             |
| **Product & Growth** | Welcome & Onboarding       | `welcome`               | New account onboarding with setup checklist                   |
|                      | Usage Quota Warning        | `usage-limit-warning`   | Monthly quota limit alert (80%/100%) with progress meter      |
|                      | Feedback / NPS Survey      | `feedback-request`      | Customer satisfaction feedback with 1-click rating link       |
|                      | Product Update / Changelog | `product-update`        | Release announcement with categorized feature tags            |

---

## 🌐 Built-in Multi-Language (i18n)

Built-in full translation dictionaries for 5 languages:

- 🇺🇸 **English (`en`)**
- 🇹🇷 **Turkish (`tr`)**
- 🇩🇪 **German (`de`)**
- 🇪🇸 **Spanish (`es`)**
- 🇫🇷 **French (`fr`)**

Outputs organized in locale-nested folders for zero-overhead backend loading:

```text
templates/emails/
├── en/
│   ├── otp.html
│   ├── team-invite.html
│   └── payment-completed.html
└── tr/
    ├── otp.html
    ├── team-invite.html
    └── payment-completed.html
```

---

## 🐹 Go Backend Integration

```go
package main

import (
	"embed"
	"fmt"
	"html/template"
)

//go:embed templates/emails/*/*.html
var emailTemplatesFS embed.FS

func main() {
	tmpl, _ := template.ParseFS(emailTemplatesFS, "templates/emails/*/*.html")

	data := map[string]any{
		"AppName":      "Limonify",
		"InviterName":  "Sarah Connor",
		"WorkspaceName": "Engineering",
		"Role":         "Admin",
		"InviteURL":    "https://ui.limonify.com/invites/accept",
	}

	// Render localized template
	tmpl.ExecuteTemplate(os.Stdout, "en/team-invite.html", data)
}
```

---

## 📄 License

MIT © [limonify](https://ui.limonify.com)
