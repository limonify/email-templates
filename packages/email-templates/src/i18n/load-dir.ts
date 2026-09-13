import fs from "node:fs";
import path from "node:path";
import { registerCustomLocale } from "./index.js";

export function loadCustomLocalesFromDir(
  dirPath: string = path.join(process.cwd(), "locales"),
) {
  if (!fs.existsSync(dirPath)) return;

  try {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      if (file.endsWith(".json")) {
        const localeCode = path.basename(file, ".json").toLowerCase();
        const content = JSON.parse(
          fs.readFileSync(path.join(dirPath, file), "utf8"),
        );
        registerCustomLocale(localeCode, content);
      }
    }
  } catch (err: any) {
    console.warn(
      `Warning: Could not load custom locales from ${dirPath}: ${err.message}`,
    );
  }
}
