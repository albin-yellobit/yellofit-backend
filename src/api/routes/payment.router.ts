import { Router } from "express";
import {
    createPackagePayment,
    paymentVerifications,
    userPaymentHistory
} from "@/api/controllers/payment.controller";

const paymentRouter = Router();

paymentRouter.post('/create-order', createPackagePayment);
paymentRouter.post('/verify', paymentVerifications);
paymentRouter.get('/history/:userId', userPaymentHistory); 

export default paymentRouter;

