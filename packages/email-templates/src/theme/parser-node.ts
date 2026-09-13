import fs from "node:fs";
import path from "node:path";
import type { EmailTheme } from "./types.js";
import { parseCssTheme, stripComments } from "./parser.js";

const MAX_IMPORT_DEPTH = 16;

function resolveImportPath(spec: string, fromDir: string): string | null {
  const candidates: string[] = [];

  if (spec.startsWith(".") || path.isAbsolute(spec)) {
    candidates.push(path.resolve(fromDir, spec));
  } else {
    // Bare specifier such as `@limonify/ui/styles.css` - walk node_modules up
    // from the importing file, the way a bundler would.
    let dir = fromDir;
    for (;;) {
      candidates.push(path.join(dir, "node_modules", spec));
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }

  for (const candidate of candidates) {
    try {
      if (fs.statSync(candidate).isFile()) return candidate;
    } catch {
      // Not here - try the next candidate.
    }
  }
  return null;
}

/**
 * Inline `@import`ed stylesheets in place so the cascade resolves.
 *
 * A design system is normally consumed as `@import '@limonify/ui/styles.css'`
 * followed by project overrides, so reading only the entry file would miss
 * every token the package defines - `--radius` and `--font-sans` among them -
 * and silently fall back for each.
 */
function flattenCss(filePath: string, seen: Set<string>, depth = 0): string {
  const resolved = path.resolve(filePath);
  if (depth > MAX_IMPORT_DEPTH || seen.has(resolved)) return "";
  seen.add(resolved);

  const dir = path.dirname(resolved);
  // Strip comments before rewriting imports, so a commented-out `@import`
  // is not followed.
  const source = stripComments(fs.readFileSync(resolved, "utf8"));

  return source.replace(
    /@import\s+(?:url\()?["']([^"')]+)["']\)?[^;]*;/g,
    (_statement, spec: string) => {
      const target = resolveImportPath(spec, dir);
      // An unresolvable specifier (`tailwindcss`) is dropped, not fatal.
      return target ? flattenCss(target, seen, depth + 1) : "";
    },
  );
}

export function parseCssFile(
  filePath: string,
  mode: "light" | "dark" = "dark",
): EmailTheme {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSS file not found: ${filePath}`);
  }
  return parseCssTheme(flattenCss(filePath, new Set()), mode);
}
