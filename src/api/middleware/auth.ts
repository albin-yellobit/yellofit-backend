import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/utils/ApiError';
import { verifyAccessToken, TokenError } from '@/utils/jwt';
import { TokenPayload } from '@/types/jwt';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(401, 'No token provided');
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);
    
    req.user = payload as TokenPayload;
    next();
  } catch (error) {
    if (error instanceof TokenError) {
      next(new ApiError(401, 'Invalid token'));
      return;
    }
    next(error);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new ApiError(401, 'Not authenticated'));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new ApiError(403, 'Not authorized'));
      return;
    }

    next();
  };
};