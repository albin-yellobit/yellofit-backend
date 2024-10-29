export interface TokenPayload {
    id: string;
    email: string;
    role: string;
}

export interface RefreshTokenPayload extends TokenPayload {
    tokenVersion: number;
}

