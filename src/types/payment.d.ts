import { Orders } from "razorpay/dist/types/orders";

// Configuration types
export interface RazorpayConfig {
  key_id: string;
  key_secret: string;
}

// Order creation types
export interface CreateOrderOptions {
  amount: number | string;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

// Payment verification types
export interface PaymentVerificationParams {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Service interface
export interface IRazorpayService {
  createOrder(amount: number, currency?: string): Promise<Orders.RazorpayOrder>;
  verifyPayment(params: PaymentVerificationParams): Promise<boolean>;
}

// Use Razorpay's built-in types for orders
export type RazorpayOrder = Orders.RazorpayOrder;

export interface Plan {
  title: string;
  description: string;
  price90: string;
  price180: string;
}

export interface CreatePaymentRequest {
  userId: string;
  planTitle: string;
  duration: 90 | 180;
}

export interface PaymentResponse {
  success: boolean;
  data?: {
    order: Orders.RazorpayOrder;
    key: string;
  };
  error?: string;
}

