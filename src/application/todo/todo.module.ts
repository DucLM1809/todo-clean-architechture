import { ApiModule } from '@app/api/todo/api.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ApiModule],
})
export class TodoModule {}
