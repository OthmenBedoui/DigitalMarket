import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { StripeWebhookController } from './payments/stripe-webhook.controller';
import { DigitalKeysService } from './digital-keys/digital-keys.service';

@Module({
  imports: [],
  controllers: [ProductsController, StripeWebhookController],
  providers: [PrismaService, AuthService, ProductsService, DigitalKeysService],
})
export class AppModule {}
