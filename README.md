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

Or launch the live interactive preview studio:

```bash
bunx @limonify/email-templates preview
```

---

## 📦 24 Production-Grade Templates

| Category                       | Template                   | ID                      | Description                                                 |
| :----------------------------- | :------------------------- | :---------------------- | :---------------------------------------------------------- |
| **Authentication & Security**  | OTP / 2FA Code             | `otp`                   | Segmented 6-digit verification code with expiration note    |
|                                | Password Reset             | `password-reset`        | Secure password reset request with action button            |
|                                | Magic Link Sign In         | `magic-link`            | One-click passwordless authentication link                  |
|                                | Email Change Verification  | `email-change`          | Security verification link for email updates                |
|                                | Security / Session Alert   | `notification`          | New sign-in alert with IP, device, and location details     |
|                                | API Key Created            | `api-key-created`       | New token alert with prefix and revocation button           |
|                                | 2FA Disabled Alert         | `two-factor-disabled`   | Critical security alert when 2FA is removed from account    |
| **Developer & DevOps (CI/CD)** | Deployment Succeeded       | `deploy-succeeded`      | Production release notice with branch, commit, and duration |
|                                | Deployment Failed Alert    | `deploy-failed`         | CI/CD build failure notice with error code block            |
|                                | Incident / Status Alert    | `incident-report`       | Operational incident update with impacted services          |
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
│   ├── deploy-succeeded.html
│   └── payment-completed.html
└── tr/
    ├── otp.html
    ├── deploy-succeeded.html
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
