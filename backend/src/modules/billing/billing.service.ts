import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { UsersService } from '../users/users.service';

const PRICE_LOOKUP = {
  pro: process.env.STRIPE_PRICE_PRO || 'price_pro',
  premium: process.env.STRIPE_PRICE_PREMIUM || 'price_premium',
};

@Injectable()
export class BillingService {
  private stripe = new Stripe(process.env.STRIPE_SECRET || 'sk_test', { apiVersion: '2023-10-16' });

  constructor(private readonly usersService: UsersService) {}

  async createCheckoutSession(userId: string, plan: 'pro' | 'premium') {
    const user = await this.usersService.findById(userId);
    return this.stripe.checkout.sessions.create({
      customer_email: user.email,
      mode: 'subscription',
      line_items: [{ price: PRICE_LOOKUP[plan], quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/billing/success`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/billing/cancel`,
      metadata: { userId: user.id, plan },
    });
  }

  async handleWebhook(event: Stripe.Event) {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan as 'pro' | 'premium';
      if (userId && plan) {
        await this.usersService.updatePlan(userId, plan);
      }
    }
    return { received: true };
  }
}
