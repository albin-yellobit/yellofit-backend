import logger from "@/config/logger";
import { createPayment, getPaymentHistory, verifyPayment } from "@/services/payment.service";
import { CreatePaymentRequest, PaymentVerificationParams,  } from "@/types/payment";
import { RequestHandler } from "express"

export const createPackagePayment: RequestHandler<
    {},
    any,
    CreatePaymentRequest
> = async (req, res, next): Promise<void> => {
    try {
        const paymentData = req.body;

        if (!paymentData.userId || !paymentData.planTitle || !paymentData.duration) {
            res.status(400).json({
                success: false,
                error: 'Missing required payment parameters'
            });
            return;
        }

        const result = await createPayment(paymentData);
        res.status(200).json(result);
        return;
    } catch (error) {
        logger.error(`Error occurred while payment initialization ${error}`);
        next(error);
    }
};

export const paymentVerifications: RequestHandler<
    {},
    any,
    PaymentVerificationParams
> = async (req, res, next): Promise<void> => {
    try {
        const verificationData = req.body;
        const result = await verifyPayment(verificationData);
        res.status(200).json(result);
        return;
    } catch (error) {
        logger.error(`Error occurred while payment gateway integration ${error}`);
        next(error);
    }
};

export const userPaymentHistory: RequestHandler<
    { userId: string }
> = async (req, res, next): Promise<void> => {
    try {
        const userId = req.params.userId;
        const result = await getPaymentHistory(userId);
        res.status(200).json(result);
        return;
    } catch (error) {
        logger.error('Error occurred while fetching payment history:', error);
        next(error);
    }
};