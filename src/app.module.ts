import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { PersistenceModule } from './infrastructure/persistence/persistence.module';
import { TodoModule } from './application/todo/todo.module';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule } from './infrastructure/services/jwt/jwt.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    PersistenceModule.register({
      type: 'prisma',
      global: true,
    }),
    BcryptModule.register({
      global: true,
    }),
    JwtModule.register({
      global: true,
    }),
    TodoModule,
  ],
})
export class AppModule {}
