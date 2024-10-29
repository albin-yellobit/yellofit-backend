import { ApiError } from "@/utils/ApiError";

declare global {
    namespace Express {
      interface Request {
        user?: {
          id: string;
          email: string;
          role: string;
        };
      }
    }
  }