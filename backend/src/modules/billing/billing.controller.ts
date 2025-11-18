import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { BillingService } from './billing.service';
import Stripe from 'stripe';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('checkout')
  createCheckout(@Body() body: { userId: string; plan: 'pro' | 'premium' }) {
    return this.billingService.createCheckoutSession(body.userId, body.plan);
  }

  @Post('webhook')
  async webhook(@Headers('stripe-signature') signature: string, @Req() req: any) {
    const stripe = new Stripe(process.env.STRIPE_SECRET || 'sk_test', { apiVersion: '2023-10-16' });
    const event = stripe.webhooks.constructEvent(req.rawBody || JSON.stringify(req.body), signature, process.env.STRIPE_WEBHOOK_SECRET || 'whsec');
    return this.billingService.handleWebhook(event);
  }
}
