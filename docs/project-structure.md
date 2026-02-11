# Project Structure

```txt
DigitalMarket/
├─ apps/
│  ├─ web/
│  │  └─ src/
│  │     ├─ app/
│  │     │  ├─ page.tsx
│  │     │  ├─ shop/
│  │     │  ├─ cart/
│  │     │  ├─ checkout/
│  │     │  ├─ auth/
│  │     │  ├─ orders/
│  │     │  ├─ support/
│  │     │  ├─ faq/
│  │     │  ├─ terms/
│  │     │  ├─ privacy/
│  │     │  └─ admin/
│  │     └─ middleware.ts
│  └─ api/
│     ├─ prisma/schema.prisma
│     └─ src/
│        ├─ auth/
│        ├─ products/
│        ├─ payments/
│        ├─ digital-keys/
│        └─ common/
├─ docs/
│  ├─ architecture.md
│  ├─ deployment.md
│  └─ production-checklist.md
├─ infra/
│  ├─ docker-compose.yml
│  ├─ api.Dockerfile
│  └─ web.Dockerfile
└─ .env.example
```

## Public pages delivered
- Home
- Shop + Product Details
- Cart
- Checkout
- Login/Register
- Orders history
- Support ticket
- FAQ
- Terms + Privacy

## Admin domains (routes scaffolded)
- Overview
- Products
- Categories
- Orders
- Clients
- Coupons
- Digital Keys Manager
- Support Tickets
- Settings
