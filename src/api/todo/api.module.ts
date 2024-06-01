import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CacheManagerModule } from '@app/infrastructure/persistence/cache/cache.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersModule } from '@app/application/todo/use-cases/users/users.module';
import { AuthController } from './auth.controller';
import { AuthModule } from '@app/application/todo/use-cases/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@app/application/common/strategies/local.strategy';

@Module({
  imports: [
    CacheManagerModule,
    CqrsModule,
    PassportModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [UserController, AuthController],
  providers: [LocalStrategy],
})
export class ApiModule {}
