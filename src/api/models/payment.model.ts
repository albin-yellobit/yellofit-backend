import { IPayment } from "@/types/model/payment";
import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema<IPayment>({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    planTitle: {
      type: String,
      required: true,
      enum: ['Wellness Program', 'Diabetes Care Program', 'Hormonal Management', 'Intense Care Plan']
    },
    duration: {
      type: Number,
      required: true,
      enum: [90, 180]
    },
    amount: {
      type: Number,
      required: true
    },
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    paymentId: {
      type: String,
      unique: true,
      sparse: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    paymentDetails: {
      type: Schema.Types.Mixed
    },
    validTill: {
      type: Date
    }
  }, {
    timestamps: true
  });
  
  export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);