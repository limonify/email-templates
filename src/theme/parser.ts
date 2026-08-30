import fs from 'node:fs'
import { colord } from 'colord'
import type { EmailTheme } from './types.js'
import { defaultLimonifyDarkTheme, defaultLimonifyLightTheme } from './defaults.js'

export function parseCssTheme(cssContent: string, mode: 'light' | 'dark' = 'dark'): EmailTheme {
  const fallback = mode === 'dark' ? defaultLimonifyDarkTheme : defaultLimonifyLightTheme
  const vars = new Map<string, string>()

  // Capture root or dark blocks or global variable definitions
  let targetBlock = cssContent

  if (mode === 'dark') {
    const darkMatch = cssContent.match(/\.dark\s*\{([^}]+)\}/) || cssContent.match(/\[data-theme=["']dark["']\]\s*\{([^}]+)\}/)
    if (darkMatch && darkMatch[1]) {
      targetBlock = darkMatch[1]
    }
  } else {
    const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/) || cssContent.match(/\[data-theme=["']light["']\]\s*\{([^}]+)\}/)
    if (rootMatch && rootMatch[1]) {
      targetBlock = rootMatch[1]
    }
  }

  // Regex to extract --var-name: value;
  const varRegex = /--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g
  let match: RegExpExecArray | null

  while ((match = varRegex.exec(targetBlock)) !== null) {
    const key = match[1]?.trim()
    const val = match[2]?.trim()
    if (key && val) {
      vars.set(key, val)
    }
  }

  // Helper to resolve CSS color values to clean HEX
  const toHex = (keys: string[], defaultHex: string): string => {
    for (const key of keys) {
      const val = vars.get(key)
      if (val) {
        // Strip var() wrappers if any
        const cleaned = val.replace(/var\([^)]+\)/g, '').trim() || val
        const color = colord(cleaned)
        if (color.isValid()) {
          return color.toHex()
        }
      }
    }
    return defaultHex
  }

  // Helper for radius
  const radius = vars.get('radius') || vars.get('border-radius') || fallback.radius

  return {
    name: `custom-${mode}`,
    primary: toHex(['primary', 'brand', 'accent-color'], fallback.primary),
    primaryForeground: toHex(['primary-foreground', 'brand-foreground'], fallback.primaryForeground),
    background: toHex(['background', 'bg'], fallback.background),
    surface: toHex(['card', 'surface', 'popover'], fallback.surface),
    surfaceBorder: toHex(['border', 'card-border'], fallback.surfaceBorder),
    foreground: toHex(['foreground', 'text'], fallback.foreground),
    muted: toHex(['muted', 'secondary'], fallback.muted),
    mutedForeground: toHex(['muted-foreground', 'text-muted'], fallback.mutedForeground),
    accent: toHex(['accent'], fallback.accent),
    accentForeground: toHex(['accent-foreground'], fallback.accentForeground),
    radius: radius.includes('px') || radius.includes('rem') ? radius : `${radius}px`,
    fontFamily: vars.get('font-sans') || fallback.fontFamily,
  }
}

export function parseCssFile(filePath: string, mode: 'light' | 'dark' = 'dark'): EmailTheme {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSS dosyası bulunamadı: ${filePath}`)
  }
  const content = fs.readFileSync(filePath, 'utf8')
  return parseCssTheme(content, mode)
}
