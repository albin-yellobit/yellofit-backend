import { User } from "@/api/models/user.modal";
import { CreatePaymentRequest, PaymentVerificationParams } from "@/types/payment";
import { getPlanAmount } from "@/utils/helper";
import razorpayService from "./razorpay.service";
import { Payment } from "@/api/models/payment.model";

export const createPayment = async (data: CreatePaymentRequest)=> {
    try {
        const { userId, planTitle, duration } = data;

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const amount = getPlanAmount(planTitle, duration);
        const razorpayOrder = await razorpayService.createOrder(amount);

        const payment = await Payment.create({
            userId,
            planTitle,
            duration,
            amount,
            orderId: razorpayOrder.id,
            validTill: new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
        });

        return {
            success: true,
            data: {
              order: razorpayOrder,
              key: process.env.RAZORPAY_KEY_ID,
              payment: payment
            }
        };
    } catch (error) {
        console.error('Create Payment Error:', error);
        throw error;
    }
}

export const verifyPayment = async (params: PaymentVerificationParams) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = params;
  
      // Verify payment signature
      const isValid = await razorpayService.verifyPayment({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature
      });
  
      if (!isValid) {
        throw new Error('Invalid payment signature');
      }
  
      // Update payment record
      const payment = await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          status: 'completed',
          paymentDetails: params
        },
        { new: true }
      );
  
      if (!payment) {
        throw new Error('Payment record not found');
      }
  
      return {
        success: true,
        data: payment
      };
    } catch (error) {
      console.error('Verify Payment Error:', error);
      throw error;
    }
};

export const getPaymentHistory = async (userId: string) => {
    try {
      const payments = await Payment.find({ userId }).sort({ createdAt: -1 });
      return {
        success: true,
        data: payments
      };
    } catch (error) {
      console.error('Get Payment History Error:', error);
      throw error;
    }
};