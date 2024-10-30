import { Router } from "express";
import paymentRouter from "./payment.router";
import authRouter from "./auth.router";

const router = Router();

router.use('/auth', authRouter);
router.use('/payment', paymentRouter);

export default router;