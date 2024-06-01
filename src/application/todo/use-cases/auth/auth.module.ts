import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './handlers';

@Module({
  imports: [CqrsModule],
  providers: [...CommandHandlers],
})
export class AuthModule {}
