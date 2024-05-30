import {
  IJwtService,
  IJwtServicePayload,
} from '@app/application/common/adapters/jwt.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}
  async verifyToken(token: string, secret: string): Promise<boolean> {
    const decode = await this.jwtService.verifyAsync(token, { secret });
    return decode;
  }

  generateToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn?: string,
  ): string {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }
}
