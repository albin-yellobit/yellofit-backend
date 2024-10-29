import express, { Application } from "express";
import helmet from "helmet";
import cors from 'cors';
import compression from "compression";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./api/middleware/errorHandler";
import config from "./config/config";
import logger from "./config/logger";
import { requestLogger } from "./api/middleware/requestMiddleware";
import { ensureLogDirectory } from './utils/ensureLogDirectory';
import router  from "./api/routes";
import { connectDB } from "./config/database";

ensureLogDirectory();

const app:Application = express();

// Connect to database
connectDB();

// security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());

// rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter)

app.use('/api', router);

app.use(errorHandler);
app.use(requestLogger);

const PORT = config.env.PORT;
app.listen(PORT, ()=>{
    logger.info(`Server running on port ${PORT}`);
})