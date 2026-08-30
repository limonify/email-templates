import fs from "node:fs";
import path from "node:path";
import type { LimonifyEmailConfig } from "../theme/types.js";

const CONFIG_FILENAMES = [
  "limonify-email.config.json",
  "limonify-email.json",
  ".limonify-emailrc.json",
  ".limonify-emailrc",
];

export function findConfigFile(cwd: string = process.cwd()): string | null {
  for (const filename of CONFIG_FILENAMES) {
    const fullPath = path.join(cwd, filename);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  return null;
}

export function loadConfigFile(configPath: string): LimonifyEmailConfig {
  try {
    const raw = fs.readFileSync(configPath, "utf8");
    return JSON.parse(raw) as LimonifyEmailConfig;
  } catch (err: any) {
    throw new Error(
      `Failed to parse configuration file (${configPath}): ${err.message}`,
    );
  }
}

export function createStarterConfigFile(
  targetPath: string = path.join(process.cwd(), "limonify-email.config.json"),
): void {
  const starterConfig: LimonifyEmailConfig = {
    themeCssPath: "./src/styles.css",
    mode: "dark",
    engine: "go",
    locales: ["en", "tr"],
    outputDir: "./templates/emails",
    theme: {
      cardStyle: "double-frame",
      radius: "14px",
    },
    branding: {
      appName: "{{ .AppName }}",
      logoUrl: "https://limeui.limonify.com/lime-ui.png?v=5",
      logoWidth: 26,
      logoHeight: 26,
      supportUrl: "https://example.com/support",
      supportText: "Have questions?",
      copyrightText: "© 2026 Limonify. All rights reserved.",
      socialLinks: [
        { platform: "github", url: "https://github.com/limonify" },
        { platform: "twitter", url: "https://twitter.com/limonify" },
      ],
    },
    translations: {
      tr: {
        otp: {
          heading: "Giriş Doğrulama Kodunuz",
          description:
            "Hesabınıza erişmek için tek kullanımlık güvenlik kodunuz:",
        },
      },
    },
    templates: {
      otp: {
        code: "{{ .Code }}",
        expiresIn: "{{ .ExpiresIn }}",
      },
      passwordReset: {
        userName: "{{ .UserName }}",
        resetUrl: "{{ .ResetURL }}",
        expiresIn: "{{ .ExpiresIn }}",
      },
      welcome: {
        userName: "{{ .UserName }}",
        dashboardUrl: "{{ .DashboardURL }}",
      },
      notification: {
        title: "{{ .Title }}",
        message: "{{ .Message }}",
        actionUrl: "{{ .ActionURL }}",
      },
      paymentCompleted: {
        orderId: "{{ .OrderID }}",
        amount: "{{ .Amount }}",
        planName: "{{ .PlanName }}",
        date: "{{ .Date }}",
        receiptUrl: "{{ .ReceiptURL }}",
      },
      magicLink: {
        loginUrl: "{{ .LoginURL }}",
        expiresIn: "{{ .ExpiresIn }}",
      },
    },
  };

  fs.writeFileSync(targetPath, JSON.stringify(starterConfig, null, 2), "utf8");
}
