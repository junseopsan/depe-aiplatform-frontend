# syntax=docker/dockerfile:1
#
# AWS ECR Public Gallery 미러를 사용해 Docker Hub rate limit 회피.
# Multi-stage build:
#   deps    → npm ci (빌드·런타임 의존성 캐시)
#   builder → next build (standalone 모드)
#   runner  → standalone 결과물만 포함한 최소 실행 이미지

ARG NODE_VERSION=20

# ──────────────────────────────────────────────────────────────────────────────
# Stage 1 – deps
# ──────────────────────────────────────────────────────────────────────────────
FROM public.ecr.aws/docker/library/node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

# package-lock.json 을 고정하여 재현 가능한 설치
COPY package.json package-lock.json ./
RUN npm ci

# ──────────────────────────────────────────────────────────────────────────────
# Stage 2 – builder
# ──────────────────────────────────────────────────────────────────────────────
FROM public.ecr.aws/docker/library/node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

# 텔레메트리 비활성화 (빌드 시간 단축)
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ──────────────────────────────────────────────────────────────────────────────
# Stage 3 – runner (production)
# next.config.ts output: "standalone" 으로 생성된 최소 번들만 복사.
# node_modules, devDependencies, 소스 파일 불포함 → 이미지 크기 최소화.
# ──────────────────────────────────────────────────────────────────────────────
FROM public.ecr.aws/docker/library/node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# ECS 태스크 정의의 containerPort 와 일치시킬 것
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# ECS Fargate 보안 권고: non-root 사용자로 실행
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# public 에셋 (Next.js 런타임이 직접 서빙)
COPY --from=builder /app/public ./public

# standalone 번들 (server.js + 필요한 node_modules 트리 셰이킹 결과)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# 정적 에셋 (_next/static)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# standalone 모드의 진입점
CMD ["node", "server.js"]
