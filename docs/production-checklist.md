# Production Checklist

## Security
- [ ] JWT secrets rotated and stored in secret manager
- [ ] BCrypt cost >= 12
- [ ] RBAC tested for all ADMIN endpoints
- [ ] Stripe webhook signature verified in prod
- [ ] Rate limits tuned by route class
- [ ] Admin audit logs enabled and retained

## Reliability
- [ ] DB backups tested (restore drill)
- [ ] Queue retry policy configured
- [ ] Dead letter queue configured
- [ ] Uptime and error alerting active

## Commerce
- [ ] Stripe and PayPal both configured
- [ ] Coupon expiration logic validated
- [ ] Flash sale jobs scheduled
- [ ] Key inventory low-stock alerts configured

## SEO & Growth
- [ ] Dynamic metadata per product/category
- [ ] sitemap.xml + robots.txt generated
- [ ] Blog publishing workflow operational
- [ ] Optional affiliate tracking tested

## Operations
- [ ] CI/CD pipeline with tests + lint + migrations
- [ ] Canary release strategy documented
- [ ] Incident runbook prepared
