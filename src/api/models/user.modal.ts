import { IUser } from "@/types/user";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
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
    country: {
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
    firebaseUid: {
        type: String,
    },
    phoneVerified: {
        type: Boolean,
        default: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    lastVerifiedAt: {
        type: Date,
        default: null
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema);