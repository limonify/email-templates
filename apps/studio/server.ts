import { join, normalize } from "node:path";

/**
 * Serves the built studio.
 *
 * The app has no backend - this exists so platforms that run a start command
 * (Dokploy, Railway, Render, a bare systemd unit) can host it without a
 * Dockerfile or an nginx config. Routing is client-side, so anything that is
 * not a file on disk falls back to the shell; without that, reloading
 * /preview or /editor would 404.
 */
const root = join(import.meta.dir, "dist");
const port = Number(process.env.PORT ?? 3000);
const shell = Bun.file(join(root, "index.html"));

if (!(await shell.exists())) {
  console.error(
    `No build found at ${root}. Run \`bun run --filter @limonify/studio build\` first.`,
  );
  process.exit(1);
}

function resolve(pathname: string) {
  // normalize() collapses `..`, and the prefix check rejects anything that
  // still points outside the build directory.
  const target = normalize(join(root, decodeURIComponent(pathname)));
  return target.startsWith(root) ? target : null;
}

Bun.serve({
  port,
  async fetch(request) {
    const { pathname } = new URL(request.url);

    if (pathname === "/healthz") {
      return new Response("ok\n", {
        headers: { "Content-Type": "text/plain" },
      });
    }

    const target = resolve(pathname);
    if (target) {
      const file = Bun.file(target);
      if (await file.exists()) {
        return new Response(file, {
          headers: {
            // Vite fingerprints asset filenames, so they never change contents.
            "Cache-Control": pathname.startsWith("/assets/")
              ? "public, max-age=31536000, immutable"
              : "no-cache",
          },
        });
      }
    }

    // A missing hashed asset is a broken deploy, not a route: answering with
    // the HTML shell would make the browser report a MIME type error instead.
    if (pathname.startsWith("/assets/")) {
      return new Response("Not found\n", { status: 404 });
    }

    return new Response(shell, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  },
});

console.log(`Limonify Email Studio running on http://localhost:${port}`);
