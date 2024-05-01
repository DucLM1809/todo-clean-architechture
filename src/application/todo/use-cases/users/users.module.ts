import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './handlers';
import { QueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class UsersModule {}
