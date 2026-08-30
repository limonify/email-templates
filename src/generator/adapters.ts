import type { TemplateEngine } from '../theme/types.js'

export function adaptVariables(html: string, engine: TemplateEngine): string {
  if (engine === 'go') {
    // Already in Go {{ .FieldName }} format
    return html
  }

  if (engine === 'handlebars') {
    // Convert {{ .FieldName }} to {{ fieldName }} (camelCase)
    return html.replace(/\{\{\s*\.([a-zA-Z0-9_]+)\s*\}\}/g, (_, field) => {
      const camel = field.charAt(0).toLowerCase() + field.slice(1)
      return `{{ ${camel} }}`
    })
  }

  if (engine === 'raw') {
    // Convert {{ .FieldName }} to __FIELD_NAME__
    return html.replace(/\{\{\s*\.([a-zA-Z0-9_]+)\s*\}\}/g, (_, field) => {
      const upperSnake = field.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()
      return `__${upperSnake}__`
    })
  }

  return html
}
