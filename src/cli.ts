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
import type { EmailTheme, TemplateEngine } from "./theme/types.js";
import {
  TEMPLATES_REGISTRY,
  type TemplateId,
  renderTemplateToHtml,
} from "./generator/render.js";

async function runInteractiveCli() {
  console.clear();
  p.intro(
    `${pc.bgYellow(pc.black(" @limonify/email-templates "))} ${pc.dim("v0.1.0")}`,
  );

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

  let theme: EmailTheme = defaultLimonifyDarkTheme;

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

  // 3. Target Engine Selection
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
  })) as TemplateEngine;

  if (p.isCancel(engine)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  // 4. Output Directory
  const outputDir = await p.text({
    message: "Output directory for generated templates:",
    placeholder: "./templates/emails",
    defaultValue: "./templates/emails",
  });

  if (p.isCancel(outputDir)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  // 5. Generate Files
  const s = p.spinner();
  s.start("Compiling responsive email templates to HTML...");

  const targetDir = path.resolve(process.cwd(), outputDir as string);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const generatedFiles: string[] = [];

  for (const templateId of selectedTemplates as TemplateId[]) {
    const meta = TEMPLATES_REGISTRY[templateId];
    const html = await renderTemplateToHtml(templateId, theme, engine);
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
  .action(runInteractiveCli);

program.parse(process.argv);
