import { Document } from "mongoose";
import { IUser } from "@/types/user";

export interface IPayment extends Document {
  userId: IUser['_id'];
  planTitle: string;
  duration: 90 | 180;
  amount: number;
  orderId: string;
  paymentId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentDetails?: Record<string, any>;
  validTill?: Date;
  createdAt: Date;
  updatedAt: Date;
}