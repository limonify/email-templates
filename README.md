<div align="center">
  <img src=".github/assets/logo.png" width="64" alt="Limonify" />
  <h1>Limonify Email</h1>
  <p>Design-system-first email templates, plus a drag & drop studio to build your own.</p>
</div>

---

## Repository layout

```
.
├── apps/
│   └── studio/                # React + Vite + TanStack Router + Tailwind v4 (client-side)
│       ├── /preview           # Gallery of the 26 built-in templates
│       └── /editor            # Drag & drop email builder
└── packages/
    └── email-templates/       # The published npm package: @limonify/email-templates
```

The studio renders emails **in the browser** with the same code the CLI uses on
the server, so what you see in the canvas is what the exported HTML contains.

## Getting started

```bash
bun install

bun run dev          # Email Studio at http://localhost:5173
bun run dev:cli      # Interactive template generator (the published CLI)
bun run preview      # Legacy single-file preview server (npm package command)
```

## Checks

```bash
bun run typecheck    # package + studio
bun run test         # package test suite
bun run format       # prettier across the repo
```

## Building your own template

1. `bun run dev` → **Editor**
2. Start from a preset or a blank canvas, drag blocks onto the email, and edit
   them in the right-hand inspector. Everything autosaves to your browser.
3. **JSON** exports the document; **HTML** exports the compiled email.
4. Render the document anywhere — CI, a backend build step, a script:

   ```bash
   bunx @limonify/email-templates doc ./my-template.json -o ./emails/my-template.html
   ```

The package README has the full CLI, Go/Node integration and i18n docs:
[`packages/email-templates/README.md`](./packages/email-templates/README.md).

## License

MIT © Limonify
