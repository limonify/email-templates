# The studio is a static bundle: build it with bun, then hand the output to
# nginx. Build context is the repository root, not apps/studio - the app
# imports the package source from packages/email-templates.
#
#   docker build -f apps/studio/Dockerfile -t limonify-studio .
FROM oven/bun:1.4-alpine AS build

WORKDIR /repo

# Manifests first so `bun install` stays cached while source files change.
COPY package.json bun.lock tsconfig.base.json ./
COPY apps/studio/package.json apps/studio/
COPY packages/email-templates/package.json packages/email-templates/
RUN bun install --frozen-lockfile

COPY . .
RUN bun run --filter @limonify/studio build

FROM nginx:1.29-alpine

COPY apps/studio/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/apps/studio/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1
