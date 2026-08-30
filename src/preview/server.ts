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
        const engine = (url.searchParams.get("engine") ||
          "go") as TemplateEngine;
        const useDummy = url.searchParams.get("dummy") === "true";

        const theme: EmailTheme =
          mode === "light"
            ? defaultLimonifyLightTheme
            : defaultLimonifyDarkTheme;

        let dummyProps = {};
        if (useDummy) {
          dummyProps = {
            appName: "Limonify",
            code: "849 201",
            userName: "Alex Morgan",
            resetUrl: "https://ui.limonify.com/reset",
            dashboardUrl: "https://ui.limonify.com/dashboard",
            loginUrl: "https://ui.limonify.com/magic-login",
            expiresIn: "10 minutes",
            orderId: "#LMN-94820",
            amount: "$49.00",
            planName: "Limonify UI Pro (Annual)",
            date: "August 30, 2026",
            receiptUrl: "https://ui.limonify.com/invoices/94820",
            title: "Security Alert: New Sign-in Detected",
            message:
              "A new login was detected from Safari on macOS in San Francisco, CA. If this was you, you can safely ignore this alert.",
            actionUrl: "https://ui.limonify.com/security",
          };
        }

        try {
          const html = await renderTemplateToHtml(
            templateId,
            theme,
            engine,
            { appName: "Limonify" },
            dummyProps,
          );
          return new Response(html, {
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        } catch (err: any) {
          return new Response(
            `<div style="color: red; padding: 20px;">Render Error: ${err.message}</div>`,
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
  <title>Limonify Email Templates Preview</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #070a11;
      color: #f8fafc;
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    aside {
      width: 280px;
      background: #0e1422;
      border-right: 1px solid #1c263c;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .brand {
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid #1c263c;
      font-weight: 700;
      font-size: 16px;
    }
    .brand-icon {
      width: 32px;
      height: 32px;
      background: #131b2e;
      border: 1px solid #1c263c;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    .templates-list {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .nav-item {
      padding: 10px 12px;
      border-radius: 8px;
      color: #94a3b8;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 2px;
      transition: all 0.15s;
    }
    .nav-item:hover {
      background: #131b2e;
      color: #f8fafc;
    }
    .nav-item.active {
      background: #facc15;
      color: #070a11;
      font-weight: 600;
    }
    .nav-item.active .desc { color: #3b3506; }
    .desc { font-size: 11px; opacity: 0.75; }
    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #070a11;
    }
    header {
      height: 60px;
      border-bottom: 1px solid #1c263c;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      background: #0e1422;
    }
    .controls { display: flex; align-items: center; gap: 12px; }
    select, button {
      background: #131b2e;
      border: 1px solid #1c263c;
      color: #f8fafc;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
      outline: none;
    }
    select:focus, button:focus { border-color: #facc15; }
    .viewport-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
      overflow: auto;
      background: radial-gradient(circle at 50% 50%, #131b2e 0%, #070a11 100%);
    }
    iframe {
      border: 1px solid #1c263c;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  </style>
</head>
<body>
  <aside>
    <div class="brand">
      <div class="brand-icon">🍋</div>
      <div>Limonify Email</div>
    </div>
    <div class="templates-list">
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
      <div style="font-weight: 600; font-size: 14px;" id="current-title">OTP / Verification Code</div>
      <div class="controls">
        <select id="mode-select" onchange="updatePreview()">
          <option value="dark">Dark Theme</option>
          <option value="light">Light Theme</option>
        </select>
        <select id="data-select" onchange="updatePreview()">
          <option value="true">Realistic Sample Data</option>
          <option value="false">Backend Variables ({{ .Code }})</option>
        </select>
        <select id="viewport-select" onchange="updateViewport()">
          <option value="560px">Desktop (560px)</option>
          <option value="375px">Mobile (375px)</option>
          <option value="100%">Full Width</option>
        </select>
      </div>
    </header>
    <div class="viewport-container">
      <iframe id="preview-frame" src="/api/render?template=otp&mode=dark&dummy=true" width="560px" height="740px"></iframe>
    </div>
  </main>

  <script>
    let activeTemplate = 'otp';

    function selectTemplate(id, el) {
      activeTemplate = id;
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      el.classList.add('active');
      document.getElementById('current-title').textContent = el.querySelector('div').textContent;
      updatePreview();
    }

    function updatePreview() {
      const mode = document.getElementById('mode-select').value;
      const dummy = document.getElementById('data-select').value;
      const iframe = document.getElementById('preview-frame');
      iframe.src = '/api/render?template=' + activeTemplate + '&mode=' + mode + '&dummy=' + dummy;
    }

    function updateViewport() {
      const vp = document.getElementById('viewport-select').value;
      const iframe = document.getElementById('preview-frame');
      iframe.style.width = vp;
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
