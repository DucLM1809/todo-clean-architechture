import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './handlers';
import { AuthService } from './auth.service';

@Module({
  imports: [CqrsModule],
  providers: [...CommandHandlers, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
