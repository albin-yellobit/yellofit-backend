import { Router } from "express";
import { validateOTP, validatePhone } from "../middleware/validationMiddleware";
import { completePhoneAuth, initializePhoneAuth, register, sendOTP, verifyOTP } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/send-otp', validatePhone, sendOTP);
authRouter.post('/verify-otp', validatePhone, verifyOTP);
authRouter.post('/register', register);
authRouter.post('/phone/initialize', initializePhoneAuth);
authRouter.post('/phone/complete', completePhoneAuth);
// authRouter.get('/user', getUserData);

export default authRouter;