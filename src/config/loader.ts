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
    outputDir: "./templates/emails",
    theme: {
      cardStyle: "double-frame",
      radius: "14px",
    },
    branding: {
      appName: "{{ .AppName }}",
      logoUrl: "https://example.com/logo.png",
      logoWidth: 36,
      logoHeight: 36,
      supportUrl: "https://example.com/support",
      supportText: "Have questions?",
      copyrightText: "© 2026 Limonify. All rights reserved.",
      socialLinks: [
        { platform: "github", url: "https://github.com/limonify" },
        { platform: "twitter", url: "https://twitter.com/limonify" },
      ],
    },
    templates: {
      otp: {
        badgeText: "Security Verification",
        heading: "Sign In Verification Code",
        description:
          "Please use the one-time verification code below to securely sign in:",
        code: "{{ .Code }}",
        expiresIn: "{{ .ExpiresIn }}",
      },
      passwordReset: {
        badgeText: "Account Security",
        heading: "Reset Your Password",
        userName: "{{ .UserName }}",
        resetUrl: "{{ .ResetURL }}",
        buttonText: "Reset Password →",
        expiresIn: "{{ .ExpiresIn }}",
      },
      welcome: {
        badgeText: "Welcome Aboard",
        userName: "{{ .UserName }}",
        dashboardUrl: "{{ .DashboardURL }}",
        buttonText: "Go to Dashboard →",
      },
      notification: {
        badgeText: "System Notification",
        title: "{{ .Title }}",
        message: "{{ .Message }}",
        actionUrl: "{{ .ActionURL }}",
        actionText: "View Details →",
      },
      paymentCompleted: {
        badgeText: "Payment Confirmed",
        heading: "Thank You for Your Order!",
        orderId: "{{ .OrderID }}",
        amount: "{{ .Amount }}",
        planName: "{{ .PlanName }}",
        date: "{{ .Date }}",
        receiptUrl: "{{ .ReceiptURL }}",
        buttonText: "Download Invoice →",
      },
      magicLink: {
        badgeText: "Instant Sign In",
        loginUrl: "{{ .LoginURL }}",
        buttonText: "Sign In Instantly →",
        expiresIn: "{{ .ExpiresIn }}",
      },
    },
  };

  fs.writeFileSync(targetPath, JSON.stringify(starterConfig, null, 2), "utf8");
}
