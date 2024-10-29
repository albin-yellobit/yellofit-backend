import config from "@/config/config";
import { CreateOrderOptions, IRazorpayService, PaymentVerificationParams, RazorpayConfig, RazorpayOrder } from "@/types/payment";
import Razorpay from "razorpay";
import { Orders } from "razorpay/dist/types/orders";

const razorpayConfig: RazorpayConfig = {
  key_id: config.env.RAZORPAY_KEY_ID,
  key_secret: config.env.RAZORPAY_KEY_SECRET
};

class RazorpayService implements IRazorpayService {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: razorpayConfig.key_id,
      key_secret: razorpayConfig.key_secret
    });
  }

  async createOrder(amount: number, currency: string = 'INR'): Promise<Orders.RazorpayOrder> {
    const options: CreateOrderOptions = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`
    };
    
    return await this.razorpay.orders.create(options);
  }

  async verifyPayment(params: PaymentVerificationParams): Promise<boolean> {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = params;
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    
    const crypto = require('crypto');
    const generated_signature = crypto
      .createHmac('sha256', razorpayConfig.key_secret)
      .update(text)
      .digest('hex');
    
    return generated_signature === razorpay_signature;
  }
}

export default new RazorpayService();
