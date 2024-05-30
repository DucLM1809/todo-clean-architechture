import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { IJwtService } from '@app/application/common/adapters/jwt.interface';

interface JwtModuleOptions {
  global?: boolean;
}

@Module({})
export class JwtModule {
  static async register({ global = false }: JwtModuleOptions) {
    return {
      imports: [
        Jwt.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: Number(process.env.JWT_EXPIRATION_TIME) },
        }),
      ],
      global,
      module: JwtModule,
      providers: [
        {
          provide: IJwtService,
          useClass: JwtTokenService,
        },
      ],
      exports: [IJwtService],
    };
  }
}
