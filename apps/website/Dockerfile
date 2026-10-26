FROM node:24-bookworm-slim AS dependencies

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /repo
RUN npm install --global pnpm@10.11.0

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc tsconfig.base.json ./
COPY apps/website/package.json apps/website/package.json
RUN pnpm install --frozen-lockfile --filter @yaoshun/website...

FROM dependencies AS build
COPY apps/website apps/website

# NEXT_PUBLIC_* values are compiled into browser bundles. Runtime env_file cannot
# replace them; GitHub repository variables supply these build arguments.
ARG NEXT_PUBLIC_SITE_URL=https://www.yaoshuntoys.com
ARG ASSET_BASE_URL
ARG NEXT_PUBLIC_ENABLE_THIRD_PARTY_TRACKING=true
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
ARG NEXT_PUBLIC_GOOGLE_ADS_ID
ARG NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_SEND_TO
ARG NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION_SEND_TO
ARG NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_CURRENCY=USD
ARG NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_VALUE=1
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
RUN pnpm --filter @yaoshun/website build

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=build --chown=node:node /repo/apps/website/.next/standalone ./
COPY --from=build --chown=node:node /repo/apps/website/.next/static ./apps/website/.next/static
COPY --from=build --chown=node:node /repo/apps/website/public ./apps/website/public
RUN mkdir -p apps/website/.next/cache && chown node:node apps/website/.next/cache
USER node
EXPOSE 3000
HEALTHCHECK --interval=20s --timeout=5s --start-period=30s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "apps/website/server.js"]
