import { IOTP } from "@/types/otp";
import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema<IOTP>({
    phone: {
      type: String,
      required: true,
      trim: true
    },
    otp: {
      type: String,
      required: false
    },
    verified: {
      type: Boolean,
      default: false
    },
    expiresAt: {
      type: Date,
      required: false
    }
}, {
    timestamps: true
});

// otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OTP = mongoose.model<IOTP>('OTP', otpSchema);
  