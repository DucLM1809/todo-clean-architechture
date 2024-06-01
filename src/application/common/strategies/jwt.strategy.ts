import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@app/domain/todo/entities/user';
import { IJwtServicePayload } from '../adapters/jwt.interface';
import { AuthService } from '@app/application/todo/use-cases/auth/auth.service';
import { EnvironmentConfigService } from '@app/infrastructure/config/environment-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    environmentConfigService: EnvironmentConfigService,
  ) {
    super({
      usernameField: 'email',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentConfigService.get('JWT_SECRET'),
    });
  }

  async validate(payload: IJwtServicePayload): Promise<User> {
    const { email } = payload;
    return this.authService.validateUser(email);
  }
}
