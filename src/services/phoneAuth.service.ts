import { User } from "@/api/models/user.modal";
import { ApiError } from "@/utils/ApiError";

export class PhoneAuthService {
    static async validatePhoneForRegistration(phone: string): Promise<boolean> {
        const existingUser = await User.findOne({ phone, phoneVerified: true });
        if (existingUser) {
            throw new ApiError(400, 'Phone number already registered');
        }
        return true;
    }

    static async validatePhoneForLogin(phone: string): Promise<boolean> {
        const existingUser = await User.findOne({ phone, phoneVerified: true });
        if (!existingUser) {
            throw new ApiError(404, 'No account found with this phone number');
        }
        return true;
    }

    static async completePhoneVerification(phone: string, firebaseUid: string): Promise<boolean> {
        const updateResult = await User.findOneAndUpdate(
            { phone },
            {
                $set: {
                    phoneVerified: true,
                    firebaseUid,
                    lastVerifiedAt: new Date()
                }
            },
            { upsert: true, new: true }
        );

        return !!updateResult;
    }
}