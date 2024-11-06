import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.modal';
import { ApiError } from '@/utils/ApiError';
import { OTPService } from '@/services/otp.service';
import logger from '@/config/logger';
import { OTP } from '../models/otp.modal';
import { PhoneAuthService } from '@/services/phoneAuth.service';

export const sendOTP = async (
    req: Request,
    res: Response,
    next: NextFunction,
) : Promise<void> => {
    try {
        const { phone } = req.body;

        const existingUser = await User.findOne({ phone, phoneVerified: true });
        if(existingUser){
            throw new ApiError(400, 'Phone number already registered');
        }

        const otp = await OTPService.createOTP(phone);
        await OTPService.sendOTP(phone, otp);

        res.status(200).json({
            success: true,
            message: "OTP sent successfully."
        });
    } catch (error) {
        logger.error(`Error in sending OTP:`, error);
        next(error);
    }
};

export const verifyOTP = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { phone, otp } = req.body;

        const isValid = await OTPService.verifyOTP(phone, otp);
        if (!isValid) {
            throw new ApiError(400, 'Invalid or expired OTP');
        }

        res.status(200).send({
            success: true,
            message: "OTP verified successfully."
        })
    } catch (error) {
        logger.error(`Error in verifying OTP ${error}`);
        next(error);
    }
}

export const initializePhoneAuth = async  (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { phone, action = 'register' } = req.body;
        if(!phone){
            throw new ApiError(400, 'Phone number is required.');
        }

        if(action === 'register'){
            await PhoneAuthService.validatePhoneForRegistration(phone);
        } else if(action === 'login'){
            await PhoneAuthService.validatePhoneForLogin(phone);
        } else {
            throw new ApiError(400, 'Invalid action type');
        }

        res.status(200).json({
            success: true,
            message: "Phone validation successful. Proceed with authentication.",
            data: { phone }
        });
    } catch (error) {
        logger.error(`Error in phone validation:`, error);
        next(error);
    }
}

export const completePhoneAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { phone, firebaseUid } = req.body;

        if (!phone || !firebaseUid) {
            throw new ApiError(400, 'Missing required fields');
        }

        const isVerified = await PhoneAuthService.completePhoneVerification(phone, firebaseUid);

        if (!isVerified) {
            throw new ApiError(500, 'Failed to complete phone verification');
        }

        res.status(200).json({
            success: true,
            message: "Phone verification completed successfully."
        });
    } catch (error) {
        logger.error(`Error in completing phone verification:`, error);
        next(error);
    }
};

export const register = async (
    req:Request, 
    res:Response,
    next:NextFunction
): Promise<void> => {
    try {
        const {
            name,
            email,
            phone,
            dob,
            state,
            city,
            gender
        } = req.body;

        const verifiedOTP = await OTP.findOne({
            phone,
            verified: true
        });
        if (!verifiedOTP) {
            throw new ApiError(400, 'Phone number not verified');
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            throw new ApiError(400, 'Email already registered');
        }

        const user = await User.create({
            name,
            email,
            phone,
            dob: new Date(dob),
            state,
            city,
            gender,
            phoneVerified: true,
            emailVerified: false
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.firstName,
                    email: user.email,
                    phone: user.phone,
                    emailVerified: user.emailVerified,
                    phoneVerified: user.phoneVerified
                }
            }
        });
    } catch (error) {
        logger.error('Error in user registration:', error);
        next(error);
    }
}