import { IJwtService } from '@app/application/todo/adapters/jwt.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  createToken(payload: any, secret: string, expiresIn: string): string {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }
}
