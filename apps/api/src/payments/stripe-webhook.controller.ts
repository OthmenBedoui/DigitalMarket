import { Body, Controller, Headers, HttpCode, Post, Req, UnauthorizedException } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma.service';
import { DigitalKeysService } from '../digital-keys/digital-keys.service';

@Controller('payments/stripe')
export class StripeWebhookController {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20',
  });

  constructor(
    private readonly prisma: PrismaService,
    private readonly digitalKeysService: DigitalKeysService,
  ) {}

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: { rawBody: Buffer },
    @Body() _body: unknown,
    @Headers('stripe-signature') signature: string,
  ) {
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );
    } catch {
      throw new UnauthorizedException('Invalid stripe signature');
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (!orderId) return { received: true };

      await this.prisma.$transaction(async (tx) => {
        const order = await tx.order.update({
          where: { id: orderId },
          data: {
            status: 'PAID',
            paymentProviderRef: session.payment_intent?.toString(),
          },
          include: {
            items: { include: { product: true } },
          },
        });

        for (const item of order.items) {
          if (item.product.deliveryType === 'AUTO_DELIVERY') {
            await this.digitalKeysService.assignAvailableKeyTx(item.productId, item.id, tx);
          }
        }
      });
    }

    return { received: true };
  }
}
