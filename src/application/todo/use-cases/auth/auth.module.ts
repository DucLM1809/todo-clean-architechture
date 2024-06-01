import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './handlers';
import { ExceptionsModule } from '@app/application/common/exceptions/exceptions.module';

@Module({
  imports: [CqrsModule, ExceptionsModule],
  providers: [...CommandHandlers],
})
export class AuthModule {}
