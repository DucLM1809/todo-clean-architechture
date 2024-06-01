import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { IJwtService } from '@app/application/common/adapters/jwt.interface';
import { LocalStrategy } from '@app/application/common/strategies/local.strategy';
import {
  EnvironmentConfigModule,
  EnvironmentConfigService,
} from '@app/infrastructure/config/environment-config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@app/application/common/strategies/jwt.strategy';
import { AuthModule } from '@app/application/todo/use-cases/auth/auth.module';
import { AuthService } from '@app/application/todo/use-cases/auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@app/application/common/guards/jwtAuth.guard';

interface JwtModuleOptions {
  global?: boolean;
}

@Module({})
export class JwtModule {
  static async register({ global = false }: JwtModuleOptions) {
    return {
      global,
      module: JwtModule,
      imports: [
        AuthModule,
        PassportModule,
        EnvironmentConfigModule,
        Jwt.registerAsync({
          imports: [EnvironmentConfigModule],
          useFactory: (environmentConfigService: EnvironmentConfigService) => ({
            secret: environmentConfigService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: environmentConfigService.get('JWT_EXPIRATION_TIME'),
            },
          }),
          inject: [EnvironmentConfigService],
        }),
      ],
      providers: [
        {
          provide: IJwtService,
          useClass: JwtTokenService,
        },
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
        AuthService,
        LocalStrategy,
        JwtStrategy,
      ],
      exports: [IJwtService],
    };
  }
}
