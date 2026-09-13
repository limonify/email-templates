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

## Deploying the studio

The studio is a static bundle with no backend, so hosting it is just serving a
directory - with one requirement: routing is client-side, so unknown paths must
fall back to `index.html`, or reloading `/preview` or `/editor` returns 404.

**Without a Dockerfile** (Dokploy, Railway, Render - anything that runs a build
and a start command). `apps/studio/server.ts` is a dependency-free Bun static
server that handles the fallback:

```bash
bun install
bun run build     # both workspaces
bun run start     # serves apps/studio/dist, PORT=3000 by default
```

In Dokploy: _Application_ → Build Type **Nixpacks**, and that is the whole
setup - `nixpacks.toml` carries the install, build and start commands, so there
is nothing to type into the UI. Point the domain at container port `3000` (or
set `PORT`).

**With Docker**, if you would rather serve it through nginx:

```bash
docker build -f apps/studio/Dockerfile -t limonify-studio .
docker run --rm -p 8080:80 limonify-studio
```

In Dokploy that is Build Type **Dockerfile**, Docker File
`apps/studio/Dockerfile`, and Docker Context Path `.` - the context has to be
the repository root, because the app builds against `packages/`.

**Plain static host** (nginx, Caddy, Cloudflare Pages): upload
`apps/studio/dist` and point the server at it; `apps/studio/nginx.conf` shows
the fallback and cache rules.

Either way `/healthz` answers `200 ok` for health checks.

Two things worth knowing before putting it on a shared server: documents are
saved in the visitor's own browser (localStorage), so nothing is shared between
people or devices, and the app has no authentication of its own - put it behind
your proxy's auth if the server is public.

The package README has the full CLI, Go/Node integration and i18n docs:
[`packages/email-templates/README.md`](./packages/email-templates/README.md).

## License

MIT © Limonify
