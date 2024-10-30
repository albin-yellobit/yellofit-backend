import { Router } from "express";
import { validateOTP, validatePhone } from "../middleware/validationMiddleware";
import { register, sendOTP, verifyOTP } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/send-otp', validatePhone, sendOTP);
authRouter.post('/verify-otp', validateOTP, verifyOTP);
authRouter.post('/register', register);

export default authRouter;