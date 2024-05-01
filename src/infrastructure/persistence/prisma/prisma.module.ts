import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from '@app/application/todo/repositories/userRepository.interface';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { EnvironmentConfigModule } from '@app/infrastructure/config/environment-config';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, UserRepository],
})
export class PrismaModule {}
