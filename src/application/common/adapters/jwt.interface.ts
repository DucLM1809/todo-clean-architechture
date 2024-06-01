export interface IJwtServicePayload {
  id: string;
  email: string;
}

export abstract class IJwtService {
  abstract verifyToken(token: string, secret: string): Promise<boolean>;
  abstract generateToken(
    payload: IJwtServicePayload,
    secret?: string,
    expiresIn?: string,
  ): string;
}
