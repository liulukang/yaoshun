FROM node:20-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_FORM_ENDPOINT
ARG NEXT_PUBLIC_GOOGLE_ADS_ID
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY

ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_GTM_ID=${NEXT_PUBLIC_GTM_ID}
ENV NEXT_PUBLIC_FORM_ENDPOINT=${NEXT_PUBLIC_FORM_ENDPOINT}
ENV NEXT_PUBLIC_GOOGLE_ADS_ID=${NEXT_PUBLIC_GOOGLE_ADS_ID}
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_TURNSTILE_SITE_KEY}

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc tsconfig.base.json ./
COPY apps/website ./apps/website

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @yaoshun/website build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/apps/website/.next/standalone ./
COPY --from=builder /app/apps/website/.next/static ./apps/website/.next/static
COPY --from=builder /app/apps/website/public ./apps/website/public

EXPOSE 3000

CMD ["node", "apps/website/server.js"]
