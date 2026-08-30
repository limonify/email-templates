import { describe, it, expect } from "bun:test";
import {
  TEMPLATES_REGISTRY,
  type TemplateId,
  renderTemplateToHtml,
} from "../src/generator/render.js";
import {
  defaultLimonifyDarkTheme,
  defaultLimonifyLightTheme,
} from "../src/theme/defaults.js";
import { LOCALES_REGISTRY } from "../src/i18n/index.js";

describe("@limonify/email-templates suite", () => {
  const templateIds = Object.keys(TEMPLATES_REGISTRY) as TemplateId[];
  const locales = Object.keys(LOCALES_REGISTRY);

  it("registers all 26 production templates", () => {
    expect(templateIds.length).toBe(26);
  });

  it("renders every template in dark mode without throwing", async () => {
    for (const id of templateIds) {
      const html = await renderTemplateToHtml(
        id,
        defaultLimonifyDarkTheme,
        "go",
        { appName: "Limonify" },
        {},
        "en",
      );
      expect(html).toBeDefined();
      expect(typeof html).toBe("string");
      expect(html.length).toBeGreaterThan(100);
      expect(html).toContain("<!DOCTYPE html");
    }
  });

  it("renders every template in light mode without throwing", async () => {
    for (const id of templateIds) {
      const html = await renderTemplateToHtml(
        id,
        defaultLimonifyLightTheme,
        "handlebars",
        { appName: "Limonify" },
        {},
        "tr",
      );
      expect(html).toBeDefined();
      expect(typeof html).toBe("string");
      expect(html.length).toBeGreaterThan(100);
    }
  });

  it("renders in all supported locales (en, tr, de, es, fr)", async () => {
    for (const locale of locales) {
      const html = await renderTemplateToHtml(
        "otp",
        defaultLimonifyDarkTheme,
        "go",
        { appName: "Limonify" },
        { code: "849201" },
        locale,
      );
      expect(html).toBeDefined();
      expect(html.length).toBeGreaterThan(100);
    }
  });
});
