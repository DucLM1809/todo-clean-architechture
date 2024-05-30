import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { EnvironmentConfigModule } from '@app/infrastructure/config/environment-config';
import { ITokenRepository } from '@app/application/todo/repositories/tokenRepository.interface';
import { PrismaTokenRepository } from './repositories/prisma-token.repository';
import { IUserRepository } from '@app/application/todo/repositories/userRepository.interface';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ITokenRepository,
      useClass: PrismaTokenRepository,
    },
  ],
  exports: [PrismaService, IUserRepository, ITokenRepository],
})
export class PrismaModule {}
