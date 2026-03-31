FROM node:20-alpine AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc tsconfig.base.json ./
COPY apps/website ./apps/website

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @yaoshun/website build

FROM nginx:1.27-alpine

COPY apps/website/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/website/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
