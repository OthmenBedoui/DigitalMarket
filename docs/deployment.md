# Docker Deployment Guide

## 1) Environment variables
Populate root `.env`, `apps/api/.env`, and `apps/web/.env.local` from examples.

## 2) Build and run
```bash
docker compose -f infra/docker-compose.yml up -d --build
```

## 3) Migrations
```bash
docker compose -f infra/docker-compose.yml exec api npx prisma migrate deploy
```

## 4) Seed admin
Create one admin user using a seed script or SQL.

## 5) Stripe webhook
Point Stripe endpoint to:
`https://your-domain.com/api/v1/payments/stripe/webhook`

Use signing secret in `STRIPE_WEBHOOK_SECRET`.

## 6) S3
Set `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_S3_BUCKET`.

## 7) Production hardening
- Put API and web behind reverse proxy (Traefik/Nginx)
- Enable TLS cert automation
- Enable backups for PostgreSQL
- Add monitoring (Prometheus + Grafana + Loki)
