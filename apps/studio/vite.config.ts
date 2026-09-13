import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const packageSrc = (file: string) =>
  fileURLToPath(
    new URL(`../../packages/email-templates/src/${file}`, import.meta.url),
  );

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Point at the package source so editing a template or component hot
      // reloads here without a separate build step.
      "@limonify/email-templates/web": packageSrc("web.ts"),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: { port: 5173 },
});
