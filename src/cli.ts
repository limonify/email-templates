#!/usr/bin/env bun
import { Command } from "commander";
import * as p from "@clack/prompts";
import pc from "picocolors";
import path from "node:path";
import fs from "node:fs";
import {
  TEMPLATES_REGISTRY,
  type TemplateId,
  renderTemplateToHtml,
} from "./generator/render.js";
import {
  defaultLimonifyDarkTheme,
  defaultLimonifyLightTheme,
} from "./theme/defaults.js";
import { parseCssTheme } from "./theme/parser.js";
import type {
  EmailTheme,
  TemplateEngine,
  BrandingConfig,
  LimonifyEmailConfig,
} from "./theme/types.js";
import {
  findConfigFile,
  loadConfigFile,
  createStarterConfigFile,
} from "./config/loader.js";
import {
  LOCALES_REGISTRY,
  loadCustomLocalesFromDir,
  registerCustomLocale,
} from "./i18n/index.js";
import { startPreviewServer } from "./preview/server.js";

const program = new Command();

program
  .name("@limonify/email-templates")
  .description(
    "Production-grade, design-system-first email templates generator for Go and backend engines",
  )
  .version("1.0.0")
  .option("-c, --config <path>", "Path to custom limonify-email.config.json")
  .option("-o, --output <dir>", "Output directory for generated templates")
  .option(
    "--init",
    "Generate starter limonify-email.config.json file in current working directory",
  )
  .option(
    "--theme-css <path>",
    "Path to your tailwind/CSS stylesheet with :root and .dark variables",
  )
  .option("--mode <mode>", "Color mode: dark or light", "dark")
  .option("--engine <engine>", "Target template engine: go, handlebars, raw")
  .option(
    "--all",
    "Generate all templates automatically without interactive prompts",
  )
  .option("--locales <locales...>", "Locales to generate (e.g. en tr de es fr)")
  .action(async (options) => {
    // 0. Handle --init directly
    if (options.init) {
      const target = path.join(process.cwd(), "limonify-email.config.json");
      createStarterConfigFile(target);
      console.log(
        pc.green(
          `\n✔ Created ${pc.bold("limonify-email.config.json")} in current working directory.\n`,
        ),
      );
      process.exit(0);
    }

    // 0.1 Discover custom ./locales directory
    loadCustomLocalesFromDir(path.join(process.cwd(), "locales"));

    // Discover config file if present
    const discoveredConfigPath =
      options.config || findConfigFile(process.cwd());
    let loadedConfig: LimonifyEmailConfig | null = null;

    if (discoveredConfigPath) {
      try {
        loadedConfig = loadConfigFile(discoveredConfigPath);
        // Register any custom translations in config
        if (loadedConfig.translations) {
          for (const [locale, dict] of Object.entries(
            loadedConfig.translations,
          )) {
            registerCustomLocale(locale, dict);
          }
        }
      } catch (err: any) {
        console.error(pc.red(`\n✖ ${err.message}\n`));
      }
    }

    // Header Intro
    console.clear();
    p.intro(
      pc.bgYellow(pc.black(pc.bold(" @limonify/email-templates "))) +
        pc.gray(" — High-craft Design System Emails"),
    );

    if (discoveredConfigPath) {
      p.note(
        `Loaded configuration from ${pc.cyan(path.relative(process.cwd(), discoveredConfigPath))}`,
        "Config Detected",
      );
    }

    // 1. Template selection
    const templateChoices = Object.values(TEMPLATES_REGISTRY).map((tmpl) => ({
      value: tmpl.id,
      label: tmpl.name,
      hint: tmpl.description,
    }));

    let selectedTemplateIds: TemplateId[] = [];
    if (options.all) {
      selectedTemplateIds = Object.keys(TEMPLATES_REGISTRY) as TemplateId[];
    } else {
      const selected = await p.multiselect({
        message: "Which email templates would you like to generate?",
        options: templateChoices as any,
        required: true,
      });

      if (p.isCancel(selected)) {
        p.cancel("Operation cancelled.");
        process.exit(0);
      }
      selectedTemplateIds = selected as TemplateId[];
    }

    // 2. Language / i18n selection
    const localeChoices = Object.entries(LOCALES_REGISTRY).map(
      ([code, meta]) => ({
        value: code,
        label: `${meta.flag} ${meta.name} (${code})`,
      }),
    );

    const initialLocales: string[] = options.locales ||
      loadedConfig?.locales || ["en", "tr"];

    let selectedLocales: string[] = [];
    if (options.all || options.locales) {
      selectedLocales = initialLocales;
    } else {
      const selected = await p.multiselect({
        message: "Which languages / locales would you like to generate?",
        options: localeChoices as any,
        initialValues: initialLocales.filter(
          (l: string) => LOCALES_REGISTRY[l],
        ),
        required: true,
      });

      if (p.isCancel(selected)) {
        p.cancel("Operation cancelled.");
        process.exit(0);
      }
      selectedLocales = selected as string[];
    }

    // 3. Engine selection
    let engine: TemplateEngine =
      (options.engine as TemplateEngine) || loadedConfig?.engine || "go";
    if (!options.all && !options.engine && !loadedConfig?.engine) {
      const selectedEngine = await p.select({
        message: "Select target template syntax / engine:",
        options: [
          {
            value: "go",
            label: "Go (html/template)",
            hint: "{{ .AppName }}, {{ .Code }}",
          },
          {
            value: "handlebars",
            label: "Handlebars / Mustache",
            hint: "{{ appName }}, {{ code }}",
          },
          {
            value: "raw",
            label: "Raw Tokens / Unmodified",
            hint: "React Email clean compiled HTML",
          },
        ],
        initialValue: "go",
      });

      if (p.isCancel(selectedEngine)) {
        p.cancel("Operation cancelled.");
        process.exit(0);
      }
      engine = selectedEngine as TemplateEngine;
    }

    // 4. Mode Selection
    let mode: "dark" | "light" =
      (options.mode as "dark" | "light") || loadedConfig?.mode || "dark";
    if (!options.all && !options.mode && !loadedConfig?.mode) {
      const selectedMode = await p.select({
        message: "Default color appearance for email clients:",
        options: [
          {
            value: "dark",
            label: "Dark Mode (Deep neutral / #0a0a0a surface)",
          },
          { value: "light", label: "Light Mode (Clean crisp white surface)" },
        ],
        initialValue: "dark",
      });

      if (p.isCancel(selectedMode)) {
        p.cancel("Operation cancelled.");
        process.exit(0);
      }
      mode = selectedMode as "dark" | "light";
    }

    // 5. Output directory
    let outputDir =
      options.output || loadedConfig?.outputDir || "./templates/emails";
    if (!options.all && !options.output && !loadedConfig?.outputDir) {
      const enteredDir = await p.text({
        message: "Where should the generated HTML templates be saved?",
        defaultValue: "./templates/emails",
        placeholder: "./templates/emails",
      });

      if (p.isCancel(enteredDir)) {
        p.cancel("Operation cancelled.");
        process.exit(0);
      }
      outputDir = enteredDir as string;
    }

    // 6. Theme CSS integration (optional)
    let theme: EmailTheme =
      mode === "light"
        ? { ...defaultLimonifyLightTheme }
        : { ...defaultLimonifyDarkTheme };

    const themeCssPath = options.themeCss || loadedConfig?.themeCssPath;
    if (themeCssPath && fs.existsSync(themeCssPath)) {
      try {
        const cssContent = fs.readFileSync(themeCssPath, "utf8");
        theme = parseCssTheme(cssContent, mode);
      } catch (err: any) {
        p.log.warn(
          `Could not parse CSS theme from ${themeCssPath}: ${err.message}`,
        );
      }
    }

    if (loadedConfig?.theme) {
      theme = { ...theme, ...loadedConfig.theme };
    }

    // Branding config
    const branding: BrandingConfig = {
      appName: "{{ .AppName }}",
      logoUrl: "https://limeui.limonify.com/lime-ui.png?v=5",
      logoWidth: 26,
      logoHeight: 26,
      ...loadedConfig?.branding,
    };

    // 7. Generation execution
    const s = p.spinner();
    const totalFiles = selectedTemplateIds.length * selectedLocales.length;
    s.start(`Generating ${totalFiles} localized HTML template files...`);

    const generatedFiles: string[] = [];
    const resolvedOutputDir = path.resolve(process.cwd(), outputDir);

    for (const locale of selectedLocales) {
      const localeDir =
        selectedLocales.length > 1
          ? path.join(resolvedOutputDir, locale)
          : resolvedOutputDir;
      fs.mkdirSync(localeDir, { recursive: true });

      for (const templateId of selectedTemplateIds) {
        const meta = TEMPLATES_REGISTRY[templateId];
        const customProps =
          (loadedConfig?.templates as any)?.[templateId] || {};

        const html = await renderTemplateToHtml(
          templateId,
          theme,
          engine,
          branding,
          customProps,
          locale,
        );

        const filePath = path.join(localeDir, meta.filename);
        fs.writeFileSync(filePath, html, "utf8");
        generatedFiles.push(path.relative(process.cwd(), filePath));
      }
    }

    s.stop(`Successfully generated ${totalFiles} email template files.`);

    p.note(
      generatedFiles.map((f) => `  ${pc.green("✔")} ${f}`).join("\n"),
      "Generated Files",
    );

    p.outro(
      pc.bold(
        `🚀 Ready! Run ${pc.cyan("bunx @limonify/email-templates preview")} to test in your browser.`,
      ),
    );
  });

// Add preview subcommand
program
  .command("preview")
  .description("Start the live interactive preview studio")
  .option("-p, --port <port>", "Port to listen on", "3000")
  .action((cmdOptions) => {
    const port = Number.parseInt(cmdOptions.port || "3000", 10);
    startPreviewServer(port);
  });

program.parse(process.argv);
