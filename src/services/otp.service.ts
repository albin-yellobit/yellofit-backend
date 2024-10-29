import { OTP } from "@/api/models/otp.modal";

export class OTPService {
    static generateOTP(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    static async sendOTP(phone: string, otp: string): Promise<boolean> {
        // TODO albin: integrate opt service
        console.log(`Sending OTP ${otp} to ${phone}`);
        return true
    }

    static async createOTP(phone: string): Promise<string> {
        await OTP.deleteMany({ phone })

        const otp = this.generateOTP();
        const expiresAt = new Date(Date.now() + 1 * 60 * 1000);

        await OTP.create({
            phone, 
            otp,
            expiresAt,
            verified: false
        });

        return otp;
    }

    static async verifyOTP(phone: string, otp: string): Promise<boolean> {
        const otpRecord = await OTP.findOne({
            phone,
            otp,
            verified: false,
            expiresAt: { $gt: new Date() }
        });

        if(!otpRecord){
            return false
        }

        otpRecord.verified = true;
        await otpRecord.save();
        return true;
    }
}