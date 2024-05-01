import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CacheManagerModule } from '@app/infrastructure/persistence/cache/cache.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersModule } from '@app/application/todo/use-cases/users/users.module';

@Module({
  imports: [CacheManagerModule, CqrsModule, UsersModule],
  controllers: [UserController],
  providers: [],
})
export class ApiModule {}
