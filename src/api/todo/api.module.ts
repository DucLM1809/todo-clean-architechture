import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CacheManagerModule } from '@app/infrastructure/persistence/cache/cache.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersModule } from '@app/application/todo/use-cases/users/users.module';
import { AuthController } from './auth.controller';
import { AuthModule } from '@app/application/todo/use-cases/auth/auth.module';

@Module({
  imports: [CacheManagerModule, CqrsModule, UsersModule, AuthModule],
  controllers: [UserController, AuthController],
  providers: [],
})
export class ApiModule {}
