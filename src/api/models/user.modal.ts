import { IUser } from "@/types/user";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a vaild email.'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required.'],
        unique: true,
        trim: true
    },
    dob: {
        type: Date,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    phoneVerified: {
        type: Boolean,
        default: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema);