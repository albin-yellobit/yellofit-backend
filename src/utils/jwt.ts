import jwt from 'jsonwebtoken'
import { RefreshTokenPayload, TokenPayload } from "@/types/jwt";
import config from '@/config/config';

export class TokenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TokenError';
    }
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.env.JWT_SECRET, {
    expiresIn: config.env.JWT_EXPIRES_IN,
  });
};
  
export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
  return jwt.sign(payload, config.env.JWT_REFRESH_SECRET, {
    expiresIn: config.env.JWT_REFRESH_EXPIRES_IN,
  });
};
  
export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, config.env.JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new TokenError('Invalid access token');
  }
};
  
export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  try {
    return jwt.verify(token, config.env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
  } catch (error) {
    throw new TokenError('Invalid refresh token');
  }
};