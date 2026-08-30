import {
  TEMPLATES_REGISTRY,
  type TemplateId,
  renderTemplateToHtml,
} from "../generator/render.js";
import {
  defaultLimonifyDarkTheme,
  defaultLimonifyLightTheme,
} from "../theme/defaults.js";
import type { EmailTheme, TemplateEngine } from "../theme/types.js";
import { LOCALES_REGISTRY, type SupportedLocale } from "../i18n/index.js";

export function startPreviewServer(port: number = 3000) {
  console.log(
    `\n🍋 Limonify Email Preview Server running at: http://localhost:${port}\n`,
  );

  Bun.serve({
    port,
    async fetch(req) {
      const url = new URL(req.url);

      // API route to get rendered email HTML
      if (url.pathname === "/api/render") {
        const templateId = (url.searchParams.get("template") ||
          "otp") as TemplateId;
        const mode = url.searchParams.get("mode") || "dark";
        const cardStyle = (url.searchParams.get("cardStyle") ||
          "double-frame") as "double-frame" | "single" | "minimal";
        const engine = (url.searchParams.get("engine") ||
          "go") as TemplateEngine;
        const locale = (url.searchParams.get("locale") ||
          "en") as SupportedLocale;
        const useDummy = url.searchParams.get("dummy") === "true";

        const baseTheme: EmailTheme =
          mode === "light"
            ? defaultLimonifyLightTheme
            : defaultLimonifyDarkTheme;
        const theme: EmailTheme = { ...baseTheme, cardStyle };

        let dummyProps: Record<string, any> = {};
        if (useDummy) {
          dummyProps = {
            appName: "Limonify",
            logoUrl: "https://limeui.limonify.com/lime-ui.png?v=5",
            logoWidth: 26,
            logoHeight: 26,
            code: "849201",
            userName: "Alex Morgan",
            inviterName: "Sarah Connor",
            authorName: "Sarah Connor",
            targetName: "Feature / Native Navigation #42",
            commentBody:
              "@alex Could you check the OKLCH token parser on Safari mobile? The preview looks sharp.",
            newEmail: "alex.morgan@company.io",
            workspaceName: "Engineering Core",
            projectName: "limonify-ui-native",
            role: "Admin",
            subject: "Scheduled Infrastructure Upgrade",
            message:
              "We are rolling out zero-downtime distributed edge clusters across Frankfurt and North America to improve latency by up to 2x.",
            actionUrl: "https://ui.limonify.com/infrastructure/upgrades",
            noticeTitle: "Scheduled Maintenance Window",
            noticeText:
              "Upgrades will occur on Sunday, Sept 6 between 02:00 and 02:30 UTC with zero expected downtime.",
            inviteUrl: "https://ui.limonify.com/invites/accept",
            resetUrl: "https://ui.limonify.com/reset",
            dashboardUrl: "https://ui.limonify.com/dashboard",
            loginUrl: "https://ui.limonify.com/magic-login",
            confirmUrl: "https://ui.limonify.com/email/confirm?token=94820",
            threadUrl: "https://ui.limonify.com/discussions/42#reply",
            deployUrl: "https://ui.limonify.com/deployments/dpl_94f8a2",
            logsUrl: "https://ui.limonify.com/deployments/dpl_failed_94/logs",
            statusUrl: "https://status.limonify.com/incidents/inc_9482",
            checkoutUrl: "https://ui.limonify.com/checkout?cart=c_94820",
            surveyUrl: "https://ui.limonify.com/survey",
            manageUrl: "https://ui.limonify.com/settings/tokens",
            upgradeUrl: "https://ui.limonify.com/billing/upgrade",
            updateBillingUrl: "https://ui.limonify.com/billing/payment-methods",
            cancelDeletionUrl: "https://ui.limonify.com/account/restore",
            secureAccountUrl: "https://ui.limonify.com/security/2fa",
            analyticsUrl: "https://ui.limonify.com/analytics",
            trackingUrl: "https://ui.limonify.com/orders/track/9482",
            changelogUrl: "https://ui.limonify.com/changelog",
            version: "v2.4.0",
            daysLeft: "3",
            cartTotal: "$199.00",
            issueNumber: "#142",
            date:
              locale === "tr"
                ? "Pazartesi, 31 Ağustos 2026"
                : "Monday, August 31, 2026",
            scheduledDate: "September 30, 2026",
            retryDate: "September 2, 2026",
            incidentTitle: "Investigating elevated API latency in EU region",
            status: "Investigating",
            affectedServices: "API Gateway, Webhooks (eu-central-1)",
            branch: "main",
            commitHash: "8af2614",
            commitMessage:
              "feat: add OKLCH mathematical color parser and 26 email templates",
            duration: "38s",
            exitStatus: "Command failed with exit code 1 (tsc)",
            errorSnippet:
              "error TS2322: Type 'string' is not assignable to type 'number'.\n  src/components/table.tsx:42:15",
            keyName: "Production Deployer Token",
            keyPrefix: "lmn_live_94f8...",
            createdAt: "August 30, 2026 at 23:15 UTC",
            metricName: "API Requests",
            usagePercent: "88%",
            currentUsage: "88,420 / 100,000 reqs",
            monthlyLimit: "100,000 reqs/mo",
            resetDate: "September 1, 2026",
            expiryDate: "September 30, 2026",
            reactivateUrl: "https://ui.limonify.com/billing/reactivate",
            expiresIn:
              locale === "tr"
                ? "10 dakika"
                : locale === "de"
                  ? "10 Minuten"
                  : "10 minutes",
            orderId: "INV-2026-9482",
            trackingNumber: "TRK-9481-0294-DHL",
            carrier: "DHL Express Worldwide",
            estDelivery:
              locale === "tr" ? "Perşembe, 3 Eylül" : "Thursday, Sept 3",
            amount: "$49.00",
            planName: "Limonify Pro (Annual)",
            paymentMethod: "Visa •••• 4242",
            subtotal: "$40.83",
            tax: "$8.17",
            receiptUrl: "https://ui.limonify.com/invoices/94820",
            title: locale === "tr" ? "Güvenlik Bildirimi" : "Security notice",
            sessionDetails: {
              device: "MacBook Pro (macOS 15.4)",
              browser: "Safari 18.3",
              location: "San Francisco, CA, United States",
              ipAddress: "192.0.2.14",
              timestamp: "August 30, 2026 at 23:15 UTC",
            },
          };
        }

        try {
          const html = await renderTemplateToHtml(
            templateId,
            theme,
            engine,
            {
              appName: "Limonify",
              logoUrl: "https://limeui.limonify.com/lime-ui.png?v=5",
              logoWidth: 26,
              logoHeight: 26,
            },
            dummyProps,
            locale,
          );
          return new Response(html, {
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        } catch (err: any) {
          return new Response(
            `<div style="color: red; padding: 20px; font-family: sans-serif;">Render Error: ${err.message}</div>`,
            { status: 500, headers: { "Content-Type": "text/html" } },
          );
        }
      }

      // App Dashboard HTML
      const templatesList = Object.values(TEMPLATES_REGISTRY);

      const dashboardHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Limonify Email Studio</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0a0a0a;
      color: #f8fafc;
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    aside {
      width: 300px;
      background: #121212;
      border-right: 1px solid #222222;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .brand {
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #222222;
    }
    .brand-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-img {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      display: block;
    }
    .brand-title {
      font-weight: 600;
      font-size: 14px;
      letter-spacing: -0.02em;
    }
    .badge-pill {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.04em;
      padding: 2px 6px;
      border-radius: 4px;
      background: #222222;
      color: #a3a3a3;
      border: 1px solid #333333;
    }
    .templates-list {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .section-label {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #525252;
      padding: 8px 8px 4px;
    }
    .nav-item {
      padding: 8px 10px;
      border-radius: 8px;
      color: #888888;
      text-decoration: none;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 2px;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      border: 1px solid transparent;
    }
    .nav-item:hover {
      background: #1c1c1c;
      color: #f8fafc;
    }
    .nav-item.active {
      background: #ffffff;
      color: #0a0a0a;
      font-weight: 600;
    }
    .nav-item.active .desc { color: #525252; }
    .desc { font-size: 11px; color: #525252; line-height: 14px; }
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #0a0a0a;
    }
    header {
      height: 56px;
      border-bottom: 1px solid #222222;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      background: #121212;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .template-title {
      font-weight: 600;
      font-size: 14px;
      letter-spacing: -0.02em;
    }
    .controls { display: flex; align-items: center; gap: 8px; }
    .control-group {
      display: flex;
      align-items: center;
      background: #1c1c1c;
      border: 1px solid #2e2e2e;
      border-radius: 6px;
      padding: 2px;
    }
    .btn-toggle {
      background: transparent;
      border: none;
      color: #888888;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      font-family: inherit;
    }
    .btn-toggle.active {
      background: #2e2e2e;
      color: #ffffff;
    }
    select {
      background: #1c1c1c;
      border: 1px solid #2e2e2e;
      color: #f8fafc;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      outline: none;
      font-family: inherit;
    }
    select:focus { border-color: #555555; }
    .btn-copy {
      background: #ffffff;
      color: #0a0a0a;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      font-family: inherit;
    }
    .btn-copy:hover {
      background: #e5e5e5;
    }
    .viewport-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
      overflow: auto;
      background: #0a0a0a;
    }
    iframe {
      border: 1px solid #222222;
      border-radius: 12px;
      background: #000;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.8);
      transition: width 0.25s ease;
    }
  </style>
</head>
<body>
  <aside>
    <div class="brand">
      <div class="brand-left">
        <img class="brand-img" src="https://limeui.limonify.com/lime-ui.png?v=5" alt="Limonify UI" />
        <div class="brand-title">Limonify Email</div>
      </div>
      <div class="badge-pill">26 TEMPLATES</div>
    </div>
    <div class="templates-list">
      <div class="section-label">Authentication & Security (8)</div>
      ${templatesList
        .slice(0, 8)
        .map(
          (t, i) => `
        <div class="nav-item ${i === 0 ? "active" : ""}" data-id="${t.id}" onclick="selectTemplate('${t.id}', this)">
          <div>${t.name}</div>
          <div class="desc">${t.description}</div>
        </div>
      `,
        )
        .join("")}

      <div class="section-label" style="margin-top: 8px;">Developer & DevOps (3)</div>
      ${templatesList
        .slice(19, 22)
        .map(
          (t) => `
        <div class="nav-item" data-id="${t.id}" onclick="selectTemplate('${t.id}', this)">
          <div>${t.name}</div>
          <div class="desc">${t.description}</div>
        </div>
      `,
        )
        .join("")}

      <div class="section-label" style="margin-top: 8px;">Billing & Subscriptions (4)</div>
      ${templatesList
        .slice(8, 12)
        .map(
          (t) => `
        <div class="nav-item" data-id="${t.id}" onclick="selectTemplate('${t.id}', this)">
          <div>${t.name}</div>
          <div class="desc">${t.description}</div>
        </div>
      `,
        )
        .join("")}

      <div class="section-label" style="margin-top: 8px;">Team & Collaboration (3)</div>
      ${templatesList
        .slice(12, 15)
        .map(
          (t) => `
        <div class="nav-item" data-id="${t.id}" onclick="selectTemplate('${t.id}', this)">
          <div>${t.name}</div>
          <div class="desc">${t.description}</div>
        </div>
      `,
        )
        .join("")}

      <div class="section-label" style="margin-top: 8px;">Newsletters & Digests (3)</div>
      ${templatesList
        .slice(17, 19)
        .concat([templatesList[15]])
        .map(
          (t) => `
        <div class="nav-item" data-id="${t.id}" onclick="selectTemplate('${t.id}', this)">
          <div>${t.name}</div>
          <div class="desc">${t.description}</div>
        </div>
      `,
        )
        .join("")}

      <div class="section-label" style="margin-top: 8px;">E-Commerce & Feedback (5)</div>
      ${templatesList
        .slice(22)
        .map(
          (t) => `
        <div class="nav-item" data-id="${t.id}" onclick="selectTemplate('${t.id}', this)">
          <div>${t.name}</div>
          <div class="desc">${t.description}</div>
        </div>
      `,
        )
        .join("")}
    </div>
  </aside>
  <main>
    <header>
      <div class="header-left">
        <div class="template-title" id="current-title">OTP / Verification Code</div>
      </div>
      <div class="controls">
        <select id="locale-select" onchange="updatePreview()">
          <option value="en">🇺🇸 English</option>
          <option value="tr">🇹🇷 Türkçe</option>
          <option value="de">🇩🇪 Deutsch</option>
          <option value="es">🇪🇸 Español</option>
          <option value="fr">🇫🇷 Français</option>
        </select>

        <div class="control-group">
          <button class="btn-toggle active" id="btn-dark" onclick="setMode('dark')">Dark</button>
          <button class="btn-toggle" id="btn-light" onclick="setMode('light')">Light</button>
        </div>

        <select id="card-style-select" onchange="updatePreview()">
          <option value="double-frame">Double-Frame Card</option>
          <option value="single">Single Card</option>
          <option value="minimal">Minimal / Flat</option>
        </select>

        <select id="data-select" onchange="updatePreview()">
          <option value="true">Sample Data</option>
          <option value="false">Backend Variables ({{ .Var }})</option>
        </select>

        <div class="control-group">
          <button class="btn-toggle active" id="btn-desktop" onclick="setViewport('520px', this)">Desktop</button>
          <button class="btn-toggle" id="btn-mobile" onclick="setViewport('375px', this)">Mobile</button>
        </div>

        <button class="btn-copy" onclick="copyHtml()">Copy HTML</button>
      </div>
    </header>
    <div class="viewport-container">
      <iframe id="preview-frame" src="/api/render?template=otp&mode=dark&cardStyle=double-frame&dummy=true&locale=en" width="520px" height="740px"></iframe>
    </div>
  </main>

  <script>
    let activeTemplate = 'otp';
    let activeMode = 'dark';

    function selectTemplate(id, el) {
      activeTemplate = id;
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      el.classList.add('active');
      document.getElementById('current-title').textContent = el.querySelector('div').textContent;
      updatePreview();
    }

    function setMode(mode) {
      activeMode = mode;
      document.getElementById('btn-dark').classList.toggle('active', mode === 'dark');
      document.getElementById('btn-light').classList.toggle('active', mode === 'light');
      updatePreview();
    }

    function setViewport(width, el) {
      document.querySelectorAll('.control-group button').forEach(b => {
        if (b.id === 'btn-desktop' || b.id === 'btn-mobile') b.classList.remove('active');
      });
      el.classList.add('active');
      document.getElementById('preview-frame').style.width = width;
    }

    function updatePreview() {
      const locale = document.getElementById('locale-select').value;
      const cardStyle = document.getElementById('card-style-select').value;
      const dummy = document.getElementById('data-select').value;
      const iframe = document.getElementById('preview-frame');
      iframe.src = '/api/render?template=' + activeTemplate + '&mode=' + activeMode + '&cardStyle=' + cardStyle + '&dummy=' + dummy + '&locale=' + locale;
    }

    async function copyHtml() {
      try {
        const locale = document.getElementById('locale-select').value;
        const cardStyle = document.getElementById('card-style-select').value;
        const dummy = document.getElementById('data-select').value;
        const res = await fetch('/api/render?template=' + activeTemplate + '&mode=' + activeMode + '&cardStyle=' + cardStyle + '&dummy=' + dummy + '&locale=' + locale);
        const html = await res.text();
        await navigator.clipboard.writeText(html);
        const btn = document.querySelector('.btn-copy');
        const oldText = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => {
          btn.textContent = oldText;
        }, 1500);
      } catch (err) {
        alert('Failed to copy HTML: ' + err.message);
      }
    }
  </script>
</body>
</html>`;

      return new Response(dashboardHtml, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    },
  });
}

// Start immediately if executed directly
if (import.meta.main) {
  startPreviewServer(3000);
}
