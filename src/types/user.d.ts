import { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    dob: Date;
    state: string;
    city: string;
    gender: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    phoneVerified: boolean;
    emailVerified: boolean;
}