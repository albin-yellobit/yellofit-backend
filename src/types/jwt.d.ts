export interface TokenPayload {
    id: string;
    email: string;
    role: string;
    phoneVerified: boolean;
    emailVerified: boolean;
}

export interface RefreshTokenPayload extends TokenPayload {
    tokenVersion: number;
}

