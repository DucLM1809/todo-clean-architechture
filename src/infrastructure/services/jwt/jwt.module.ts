import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { IJwtService } from '@app/application/common/adapters/jwt.interface';

interface JwtModuleOptions {
  global?: boolean;
}

@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRATION_TIME) },
    }),
  ],
})
export class JwtModule {
  static async register({ global = false }: JwtModuleOptions) {
    return {
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
