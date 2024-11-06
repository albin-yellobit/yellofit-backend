import { Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    firebaseUid?: string;
    lastVerifiedAt?: Date;
    dob: Date;
    country: string;
    state: string;
    city: string;
    gender: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    phoneVerified: boolean;
    emailVerified: boolean;
    role: string
}