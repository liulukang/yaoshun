# @yaoshun/website

Minimal Next.js website scaffold.

## Local Development

```bash
pnpm install
pnpm dev:website
```

## Build

```bash
pnpm --filter @yaoshun/website build
```

Available build targets:

```bash
pnpm --filter @yaoshun/website build:development
pnpm --filter @yaoshun/website build:preview
pnpm --filter @yaoshun/website build:production
```

## App Config

This project no longer depends on deployment environment variables for site URL or tracking IDs.
Application config lives in:

```bash
src/config/app-config.development.ts
src/config/app-config.preview.ts
src/config/app-config.production.ts
```

The selected target is copied into `src/config/app-config.generated.ts` by the build command before `next build`.

## Vercel

Use different Build Commands for different environments:

```bash
pnpm --filter @yaoshun/website build:preview
pnpm --filter @yaoshun/website build:production
```
