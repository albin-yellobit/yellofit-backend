import { Document } from "mongoose";

export interface IOTP extends Document {
    phone: string;
    otp: string;
    verified: boolean;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}