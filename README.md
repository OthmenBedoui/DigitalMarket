# DigitalMarket — Premium Single-Seller Digital Marketplace

DigitalMarket is a **single-admin SaaS storefront** inspired by G2G UX patterns, but intentionally **not multi-vendor**.
Only one administrator manages all products, keys, services, and fulfillment.

## Core stack
- Frontend: Next.js 14 (App Router) + TypeScript
- UI: TailwindCSS + Shadcn UI
- Backend: NestJS + Prisma
- DB: PostgreSQL
- Auth: JWT + Refresh Token
- Payments: Stripe + PayPal (adapter-ready)
- Storage: AWS S3
- Queue/Cache: Redis + BullMQ
- Infra: Docker Compose (dev/prod baseline)

## Monorepo layout
- `apps/web`: Next.js storefront + admin panel UI
- `apps/api`: NestJS API, auth, products, orders, Stripe webhook, key delivery
- `packages/ui`: shared ui package placeholder
- `infra`: docker and infra templates
- `docs`: architecture, deployment, and production checklist

## Quick start (dev)
```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
docker compose up -d postgres redis
```

Then install and run both apps from your preferred workspace manager (pnpm recommended).

## Important business rule
This project enforces a **single seller model**:
- No vendor table
- No seller onboarding
- Products always owned by platform admin
- Buyers are `USER`, operator is `ADMIN`
