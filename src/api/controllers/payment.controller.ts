import logger from "@/config/logger";
import { createPayment, getPaymentHistory, verifyPayment } from "@/services/payment.service";
import { CreatePaymentRequest, PaymentVerificationParams } from "@/types/payment";
import { Request, Response, NextFunction } from "express"

export const createPackagePayment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const paymentData: CreatePaymentRequest = req.body;

        if (!paymentData.userId || !paymentData.planTitle || !paymentData.duration) {
            return res.status(400).json({
              success: false,
              error: 'Missing required payment parameters'
            });
        }

        const result = await createPayment(paymentData);
        return res.status(200).json(result);
    } catch (error) {
        logger.error(`Error occured while payment initialisation ${error}`);
        next(error);
    }
}

export const paymentVerifications = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const verificationData: PaymentVerificationParams = req.body;
        const result = await verifyPayment(verificationData)
        return res.status(200).json(result);
    } catch (error) {
        logger.error(`Error occured while payment gateway integration ${error}`);
        next(error);
    }
}

export const userPaymentHistory = async (
    req: Request, 
    res: Response,
    next: NextFunction
) => {
    try {
      const userId = req.params.userId;
      const result = await getPaymentHistory(userId);
      return res.status(200).json(result);
    } catch (error: any) {
        logger.error('Error occured while fetching payment history:', error);
        next(error);
    }
  };