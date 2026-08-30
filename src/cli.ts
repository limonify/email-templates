#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import * as p from '@clack/prompts'
import pc from 'picocolors'
import { Command } from 'commander'
import { parseCssFile, parseCssTheme } from './theme/parser.js'
import { defaultLimonifyDarkTheme, defaultLimonifyLightTheme } from './theme/defaults.js'
import type { EmailTheme, TemplateEngine } from './theme/types.js'
import { TEMPLATES_REGISTRY, type TemplateId, renderTemplateToHtml } from './generator/render.js'

async function runInteractiveCli() {
  console.clear()
  p.intro(`${pc.bgYellow(pc.black(' @limonify/email-templates '))} ${pc.dim('v0.1.0')}`)

  // 1. Template selection
  const templateChoices = Object.values(TEMPLATES_REGISTRY).map((tmpl) => ({
    value: tmpl.id,
    label: tmpl.name,
    hint: tmpl.description,
  }))

  const selectedTemplates = await p.multiselect({
    message: 'Hangi e-posta şablonlarını oluşturmak istiyorsunuz?',
    options: templateChoices,
    required: true,
  })

  if (p.isCancel(selectedTemplates)) {
    p.cancel('İşlem iptal edildi.')
    process.exit(0)
  }

  // 2. Theme source selection
  const themeSource = await p.select({
    message: 'Tema ve renk paletini nereden almak istersiniz?',
    options: [
      { value: 'file', label: 'CSS Dosyası Yolu Belirt', hint: 'Örn: ./src/styles.css veya globals.css' },
      { value: 'paste', label: 'CSS Değişkenlerini Doğrudan Yapıştır', hint: ':root { --primary: #... }' },
      { value: 'default-dark', label: 'Limonify Dark (Varsayılan Koyu Tema)', hint: 'Limon sarısı & Koyu zemin' },
      { value: 'default-light', label: 'Limonify Light (Varsayılan Açık Tema)', hint: 'Limon sarısı & Açık zemin' },
    ],
  })

  if (p.isCancel(themeSource)) {
    p.cancel('İşlem iptal edildi.')
    process.exit(0)
  }

  let theme: EmailTheme = defaultLimonifyDarkTheme

  if (themeSource === 'default-dark') {
    theme = defaultLimonifyDarkTheme
  } else if (themeSource === 'default-light') {
    theme = defaultLimonifyLightTheme
  } else if (themeSource === 'file') {
    const cssPath = await p.text({
      message: 'CSS dosyasının yolunu girin:',
      placeholder: './styles.css',
      defaultValue: './styles.css',
      validate: (val) => {
        if (!val || !fs.existsSync(val)) return `Dosya bulunamadı: ${val}`
      },
    })

    if (p.isCancel(cssPath)) {
      p.cancel('İşlem iptal edildi.')
      process.exit(0)
    }

    const mode = await p.select({
      message: 'Hangi modu ayrıştırmak istersiniz?',
      options: [
        { value: 'dark', label: 'Dark Mode (Koyu Tema)' },
        { value: 'light', label: 'Light Mode (Açık Tema)' },
      ],
    })

    if (p.isCancel(mode)) {
      p.cancel('İşlem iptal edildi.')
      process.exit(0)
    }

    try {
      theme = parseCssFile(cssPath as string, mode as 'light' | 'dark')
      p.log.success(
        `CSS ayrıştırıldı: ${pc.bold(theme.primary)} (primary), ${pc.bold(theme.background)} (background)`
      )
    } catch (err: any) {
      p.log.error(`CSS ayrıştırma hatası: ${err.message}`)
      theme = defaultLimonifyDarkTheme
    }
  } else if (themeSource === 'paste') {
    const cssContent = await p.text({
      message: 'CSS değişkenlerini veya bloklarını yapıştırın:',
      placeholder: ':root { --primary: #facc15; --background: #09090b; }',
    })

    if (p.isCancel(cssContent)) {
      p.cancel('İşlem iptal edildi.')
      process.exit(0)
    }

    theme = parseCssTheme(cssContent as string, 'dark')
    p.log.success(`CSS ayrıştırıldı: ${pc.bold(theme.primary)} (primary)`)
  }

  // 3. Target Engine Selection
  const engine = (await p.select({
    message: 'Backend şablon motoru / değişken formatı nedir?',
    options: [
      { value: 'go', label: 'Go template', hint: '{{ .AppName }}, {{ .Code }}' },
      { value: 'handlebars', label: 'Handlebars / Mustache / Jinja', hint: '{{ appName }}, {{ code }}' },
      { value: 'raw', label: 'Raw Placeholder', hint: '__APP_NAME__, __CODE__' },
    ],
  })) as TemplateEngine

  if (p.isCancel(engine)) {
    p.cancel('İşlem iptal edildi.')
    process.exit(0)
  }

  // 4. Output Directory
  const outputDir = await p.text({
    message: 'Şablonların kaydedileceği klasör:',
    placeholder: './templates/emails',
    defaultValue: './templates/emails',
  })

  if (p.isCancel(outputDir)) {
    p.cancel('İşlem iptal edildi.')
    process.exit(0)
  }

  // 5. Generate Files
  const s = p.spinner()
  s.start('E-posta şablonları HTML olarak derleniyor...')

  const targetDir = path.resolve(process.cwd(), outputDir as string)
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  const generatedFiles: string[] = []

  for (const templateId of selectedTemplates as TemplateId[]) {
    const meta = TEMPLATES_REGISTRY[templateId]
    const html = await renderTemplateToHtml(templateId, theme, engine)
    const filePath = path.join(targetDir, meta.filename)
    fs.writeFileSync(filePath, html, 'utf8')
    generatedFiles.push(meta.filename)
  }

  s.stop(pc.green(`✓ ${generatedFiles.length} adet e-posta şablonu başarıyla oluşturuldu!`))

  p.note(
    generatedFiles.map((file) => `  ${pc.cyan('→')} ${path.join(outputDir as string, file)}`).join('\n'),
    'Oluşturulan Dosyalar'
  )

  p.outro(pc.bold(pc.yellow('Limonify Email Templates ile hazır! ✨')))
}

const program = new Command()
program
  .name('limonify-email')
  .description('Limonify UI uyumlu dinamik HTML e-posta şablonu oluşturucu')
  .version('0.1.0')
  .action(runInteractiveCli)

program.parse(process.argv)
