# @yaoshun/website

Toy export corporate website built with Next.js + Tailwind.

## Local Development

```bash
pnpm install
pnpm dev:website
```

Copy env template:

```bash
cp apps/website/.env.example apps/website/.env
```

## Build Static Output

```bash
pnpm --filter @yaoshun/website build
```

Build output directory: `apps/website/out`

## Docker (Nginx static hosting)

```bash
cd apps/website
docker compose up --build
```

Website runs on `http://localhost:8080`.
