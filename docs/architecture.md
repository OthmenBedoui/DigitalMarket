# Architecture (Ultra Advanced)

## 1) Product vision
A premium gaming-focused digital commerce platform for one operator (ADMIN) and many buyers (USER).

## 2) Bounded contexts
- **Identity & Access**: registration/login, JWT, refresh token, RBAC
- **Catalog**: categories, products, media, stock/delivery mode
- **Commerce**: cart, checkout, orders, coupons, flash-sale pricing
- **Fulfillment**: auto key assignment, manual delivery queue, file downloads
- **Support**: tickets and threaded replies
- **Trust**: reviews, anti-fraud checks, admin audit logs
- **Content/SEO**: blog, dynamic metadata, sitemap

## 3) Runtime architecture
- Next.js app calls Nest API via secure HTTPS JSON API.
- Nest API persists data to PostgreSQL via Prisma.
- Stripe webhooks are validated and converted to domain events.
- BullMQ workers process async tasks:
  - order confirmation email
  - key assignment retries
  - ticket notifications
- Redis used for:
  - cache (featured products, category trees)
  - rate limit store
  - queue backend

## 4) Security model
- BCrypt password hashing (cost >= 12)
- Access token short TTL, refresh token rotation
- RBAC with `@Roles('ADMIN')` guards
- DTO validation and class-transformer
- IP + account-level anti-bruteforce throttling
- Stripe signature verification
- Admin audit logs for critical changes

## 5) Data flow (checkout to auto delivery)
1. User creates checkout session.
2. Stripe redirects to hosted checkout.
3. Stripe webhook `checkout.session.completed` received.
4. Order created/confirmed in DB.
5. For each auto-delivery item, worker reserves available digital key.
6. Key marked used + linked to order item.
7. User sees key in order details and receives email.

## 6) Scaling
- Stateless API pods behind load balancer
- Read replica for product browsing
- S3 + CloudFront for media/downloads
- Separate payment microservice possible (`apps/payments`) for PCI boundary

## 7) Non-functional targets
- p95 API latency < 250ms for catalog endpoints (cached)
- 99.9% webhook processing success with retries
- RPO <= 15 minutes (WAL archiving)
- Full observability: logs, metrics, tracing
