#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import * as p from "@clack/prompts";
import pc from "picocolors";
import { Command } from "commander";
import { parseCssFile, parseCssTheme } from "./theme/parser.js";
import {
  defaultLimonifyDarkTheme,
  defaultLimonifyLightTheme,
} from "./theme/defaults.js";
import type {
  EmailTheme,
  TemplateEngine,
  BrandingConfig,
  LimonifyEmailConfig,
} from "./theme/types.js";
import {
  TEMPLATES_REGISTRY,
  type TemplateId,
  renderTemplateToHtml,
} from "./generator/render.js";
import {
  findConfigFile,
  loadConfigFile,
  createStarterConfigFile,
} from "./config/loader.js";

async function runInteractiveCli(options: { config?: string; init?: boolean }) {
  console.clear();
  p.intro(
    `${pc.bgYellow(pc.black(" @limonify/email-templates "))} ${pc.dim("v0.1.0")}`,
  );

  if (options.init) {
    const target = path.join(process.cwd(), "limonify-email.config.json");
    createStarterConfigFile(target);
    p.log.success(`Configuration file created at: ${pc.bold(target)}`);
    p.outro(
      pc.bold(
        pc.yellow(
          "Edit this file to customize all template texts, variables, and themes! ✨",
        ),
      ),
    );
    process.exit(0);
  }

  // Check for existing config file
  const existingConfigPath = options.config || findConfigFile();
  let loadedConfig: LimonifyEmailConfig | null = null;

  if (existingConfigPath) {
    const useConfig = await p.confirm({
      message: `Found configuration file at ${pc.cyan(existingConfigPath)}. Use settings from this file?`,
      initialValue: true,
    });

    if (p.isCancel(useConfig)) {
      p.cancel("Operation cancelled.");
      process.exit(0);
    }

    if (useConfig) {
      loadedConfig = loadConfigFile(existingConfigPath);
      p.log.success("Configuration loaded successfully.");
    }
  }

  // 1. Template selection
  const templateChoices = Object.values(TEMPLATES_REGISTRY).map((tmpl) => ({
    value: tmpl.id,
    label: tmpl.name,
    hint: tmpl.description,
  }));

  const selectedTemplates = await p.multiselect({
    message: "Which email templates would you like to generate?",
    options: templateChoices,
    required: true,
  });

  if (p.isCancel(selectedTemplates)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  // 2. Theme source selection
  let theme: EmailTheme = defaultLimonifyDarkTheme;

  if (loadedConfig?.themeCssPath) {
    theme = parseCssFile(
      loadedConfig.themeCssPath,
      loadedConfig.mode || "dark",
    );
    if (loadedConfig.theme) {
      theme = { ...theme, ...loadedConfig.theme };
    }
  } else {
    const themeSource = await p.select({
      message: "Where should we extract your theme & colors from?",
      options: [
        {
          value: "file",
          label: "Specify CSS File Path",
          hint: "e.g. ./src/styles.css or globals.css",
        },
        {
          value: "paste",
          label: "Paste CSS Variables Directly",
          hint: ":root { --primary: #... }",
        },
        {
          value: "default-dark",
          label: "Limonify Dark (Default Dark Theme)",
          hint: "Limon yellow on dark background",
        },
        {
          value: "default-light",
          label: "Limonify Light (Default Light Theme)",
          hint: "Limon yellow on light background",
        },
      ],
    });

    if (p.isCancel(themeSource)) {
      p.cancel("Operation cancelled.");
      process.exit(0);
    }

    if (themeSource === "default-dark") {
      theme = defaultLimonifyDarkTheme;
    } else if (themeSource === "default-light") {
      theme = defaultLimonifyLightTheme;
    } else if (themeSource === "file") {
      const cssPath = await p.text({
        message: "Enter the path to your CSS file:",
        placeholder: "./styles.css",
        defaultValue: "./styles.css",
        validate: (val) => {
          if (!val || !fs.existsSync(val)) return `File not found: ${val}`;
        },
      });

      if (p.isCancel(cssPath)) {
        p.cancel("Operation cancelled.");
        process.exit(0);
      }

      const mode = await p.select({
        message: "Which theme mode would you like to parse?",
        options: [
          { value: "dark", label: "Dark Mode" },
          { value: "light", label: "Light Mode" },
        ],
      });

      if (p.isCancel(mode)) {
        p.cancel("Operation cancelled.");
        process.exit(0);
      }

      try {
        theme = parseCssFile(cssPath as string, mode as "light" | "dark");
        p.log.success(
          `CSS parsed: ${pc.bold(theme.primary)} (primary), ${pc.bold(theme.background)} (background)`,
        );
      } catch (err: any) {
        p.log.error(`CSS parsing error: ${err.message}`);
        theme = defaultLimonifyDarkTheme;
      }
    } else if (themeSource === "paste") {
      const cssContent = await p.text({
        message: "Paste your CSS variables or block:",
        placeholder: ":root { --primary: #facc15; --background: #09090b; }",
      });

      if (p.isCancel(cssContent)) {
        p.cancel("Operation cancelled.");
        process.exit(0);
      }

      theme = parseCssTheme(cssContent as string, "dark");
      p.log.success(`CSS parsed: ${pc.bold(theme.primary)} (primary)`);
    }
  }

  // 3. Card Style Selection
  const cardStyle = (await p.select({
    message: "Card Visual Style:",
    options: [
      {
        value: "double-frame",
        label: "Limonify Double-Frame Card (Recommended)",
        hint: "Outer subtle frame + inner card",
      },
      {
        value: "single",
        label: "Single Solid Card",
        hint: "Standard border card",
      },
      {
        value: "minimal",
        label: "Minimal / Flat",
        hint: "Borderless clean text canvas",
      },
    ],
    initialValue: loadedConfig?.theme?.cardStyle || "double-frame",
  })) as "double-frame" | "single" | "minimal";

  if (p.isCancel(cardStyle)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  theme.cardStyle = cardStyle;

  // 4. Target Engine Selection
  const engine = (await p.select({
    message: "What is your target backend template engine / variable format?",
    options: [
      {
        value: "go",
        label: "Go template",
        hint: "{{ .AppName }}, {{ .Code }}",
      },
      {
        value: "handlebars",
        label: "Handlebars / Mustache / Jinja",
        hint: "{{ appName }}, {{ code }}",
      },
      {
        value: "raw",
        label: "Raw Placeholder",
        hint: "__APP_NAME__, __CODE__",
      },
    ],
    initialValue: loadedConfig?.engine || "go",
  })) as TemplateEngine;

  if (p.isCancel(engine)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  // 5. Branding Configuration
  const defaultAppName =
    loadedConfig?.branding?.appName ||
    (engine === "go"
      ? "{{ .AppName }}"
      : engine === "handlebars"
        ? "{{ appName }}"
        : "Limonify");
  const appName = await p.text({
    message: "App / Brand Name:",
    placeholder: defaultAppName,
    defaultValue: defaultAppName,
  });

  if (p.isCancel(appName)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const logoUrl = await p.text({
    message: "Logo Image URL (Optional, leave empty for Limonify brand badge):",
    placeholder: "https://example.com/logo.png",
    defaultValue: loadedConfig?.branding?.logoUrl || "",
  });

  if (p.isCancel(logoUrl)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const branding: BrandingConfig = {
    appName: appName as string,
    logoUrl: (logoUrl as string)?.trim() || undefined,
    logoWidth: loadedConfig?.branding?.logoWidth || 36,
    logoHeight: loadedConfig?.branding?.logoHeight || 36,
    supportUrl:
      loadedConfig?.branding?.supportUrl || "https://limonify.com/support",
    copyrightText: loadedConfig?.branding?.copyrightText,
    socialLinks: loadedConfig?.branding?.socialLinks,
  };

  // 6. Output Directory
  const outputDir = await p.text({
    message: "Output directory for generated templates:",
    placeholder: "./templates/emails",
    defaultValue: loadedConfig?.outputDir || "./templates/emails",
  });

  if (p.isCancel(outputDir)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  // 7. Generate Files
  const s = p.spinner();
  s.start("Compiling customizable email templates to HTML...");

  const targetDir = path.resolve(process.cwd(), outputDir as string);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const generatedFiles: string[] = [];

  for (const templateId of selectedTemplates as TemplateId[]) {
    const meta = TEMPLATES_REGISTRY[templateId];
    const customProps = (loadedConfig?.templates as any)?.[templateId] || {};
    const html = await renderTemplateToHtml(
      templateId,
      theme,
      engine,
      branding,
      customProps,
    );
    const filePath = path.join(targetDir, meta.filename);
    fs.writeFileSync(filePath, html, "utf8");
    generatedFiles.push(meta.filename);
  }

  s.stop(
    pc.green(
      `✓ Successfully generated ${generatedFiles.length} email template(s)!`,
    ),
  );

  p.note(
    generatedFiles
      .map(
        (file) => `  ${pc.cyan("→")} ${path.join(outputDir as string, file)}`,
      )
      .join("\n"),
    "Generated Templates",
  );

  p.outro(pc.bold(pc.yellow("Ready with Limonify Email Templates! ✨")));
}

const program = new Command();
program
  .name("limonify-email")
  .description("Limonify UI compatible dynamic HTML email templates generator")
  .version("0.1.0")
  .option("-c, --config <path>", "Path to custom limonify-email.config.json")
  .option("--init", "Generate a starter limonify-email.config.json file")
  .action((options) => runInteractiveCli(options));

program.parse(process.argv);
