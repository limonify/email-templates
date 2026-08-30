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
            code: "849201",
            userName: "Alex Morgan",
            resetUrl: "https://ui.limonify.com/reset",
            dashboardUrl: "https://ui.limonify.com/dashboard",
            loginUrl: "https://ui.limonify.com/magic-login",
            expiresIn:
              locale === "tr"
                ? "10 dakika"
                : locale === "de"
                  ? "10 Minuten"
                  : locale === "es"
                    ? "10 minutos"
                    : locale === "fr"
                      ? "10 minutes"
                      : "10 minutes",
            orderId: "#LMN-94820",
            amount: "$49.00",
            planName: "Limonify UI Pro (Annual Plan)",
            paymentMethod: "Visa ending in 4242",
            subtotal: "$40.83",
            tax: "$8.17",
            date:
              locale === "tr"
                ? "30 Ağustos 2026"
                : locale === "de"
                  ? "30. August 2026"
                  : "August 30, 2026",
            receiptUrl: "https://ui.limonify.com/invoices/94820",
            title:
              locale === "tr"
                ? "Güvenlik Uyarısı: Yeni Giriş Algılandı"
                : locale === "de"
                  ? "Sicherheitswarnung: Neue Anmeldung"
                  : "Security Alert: New Sign-in Detected",
            message:
              locale === "tr"
                ? "Hesabınıza San Francisco, ABD konumundaki macOS Safari tarayıcısından yeni bir giriş yapıldı."
                : "A new session was initiated on your account from Safari on macOS in San Francisco, CA. If this was you, no action is needed.",
            actionUrl: "https://ui.limonify.com/security",
            sessionDetails: {
              device: "MacBook Pro (macOS 15.4)",
              browser: "Safari 18.3",
              location: "San Francisco, CA, United States",
              ipAddress: "192.0.2.14",
              timestamp: "August 30, 2026 at 23:05 UTC",
            },
          };
        }

        try {
          const html = await renderTemplateToHtml(
            templateId,
            theme,
            engine,
            { appName: "Limonify" },
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
  <title>Limonify Email Templates Studio</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
      width: 290px;
      background: #171717;
      border-right: 1px solid #262626;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .brand {
      padding: 18px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #262626;
    }
    .brand-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-icon {
      width: 32px;
      height: 32px;
      background: #262626;
      border: 1px solid #383838;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
    .brand-title {
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.02em;
    }
    .badge-pill {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 3px 7px;
      border-radius: 9999px;
      background: rgba(250, 204, 21, 0.15);
      color: #facc15;
      border: 1px solid rgba(250, 204, 21, 0.3);
    }
    .templates-list {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .section-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #737373;
      padding: 8px 10px 4px;
    }
    .nav-item {
      padding: 10px 12px;
      border-radius: 10px;
      color: #a3a3a3;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 3px;
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      border: 1px solid transparent;
    }
    .nav-item:hover {
      background: #262626;
      color: #f8fafc;
      border-color: #383838;
    }
    .nav-item.active {
      background: #facc15;
      color: #0a0a0a;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(250, 204, 21, 0.25);
    }
    .nav-item.active .desc { color: #423b05; font-weight: 500; }
    .desc { font-size: 11px; color: #737373; line-height: 14px; }
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #0a0a0a;
    }
    header {
      height: 64px;
      border-bottom: 1px solid #262626;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      background: #171717;
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .template-title {
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.02em;
    }
    .controls { display: flex; align-items: center; gap: 10px; }
    .control-group {
      display: flex;
      align-items: center;
      background: #262626;
      border: 1px solid #383838;
      border-radius: 8px;
      padding: 2px;
    }
    .btn-toggle {
      background: transparent;
      border: none;
      color: #a3a3a3;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      font-family: inherit;
    }
    .btn-toggle.active {
      background: #383838;
      color: #f8fafc;
    }
    select {
      background: #262626;
      border: 1px solid #383838;
      color: #f8fafc;
      padding: 7px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      outline: none;
      font-family: inherit;
    }
    select:focus { border-color: #facc15; }
    .btn-copy {
      background: #facc15;
      color: #0a0a0a;
      border: none;
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s;
      font-family: inherit;
    }
    .btn-copy:hover {
      background: #fde047;
      box-shadow: 0 4px 12px rgba(250, 204, 21, 0.3);
    }
    .viewport-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 32px;
      overflow: auto;
      background: radial-gradient(circle at 50% 30%, #1f1f1f 0%, #0a0a0a 100%);
    }
    iframe {
      border: 1px solid #262626;
      border-radius: 16px;
      background: #000;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
  </style>
</head>
<body>
  <aside>
    <div class="brand">
      <div class="brand-left">
        <div class="brand-icon">🍋</div>
        <div class="brand-title">Limonify Email</div>
      </div>
      <div class="badge-pill">STUDIO</div>
    </div>
    <div class="templates-list">
      <div class="section-label">Core Templates</div>
      ${templatesList
        .map(
          (t, i) => `
        <div class="nav-item ${i === 0 ? "active" : ""}" data-id="${t.id}" onclick="selectTemplate('${t.id}', this)">
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
        <!-- Language Selector -->
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
          <option value="true">Live Sample Data</option>
          <option value="false">Go Template ({{ .Code }})</option>
        </select>

        <div class="control-group">
          <button class="btn-toggle active" id="btn-desktop" onclick="setViewport('540px', this)">Desktop</button>
          <button class="btn-toggle" id="btn-mobile" onclick="setViewport('375px', this)">Mobile</button>
        </div>

        <button class="btn-copy" onclick="copyHtml()">Copy HTML</button>
      </div>
    </header>
    <div class="viewport-container">
      <iframe id="preview-frame" src="/api/render?template=otp&mode=dark&cardStyle=double-frame&dummy=true&locale=en" width="540px" height="760px"></iframe>
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
        btn.textContent = '✓ Copied!';
        btn.style.background = '#22c55e';
        setTimeout(() => {
          btn.textContent = oldText;
          btn.style.background = '#facc15';
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
