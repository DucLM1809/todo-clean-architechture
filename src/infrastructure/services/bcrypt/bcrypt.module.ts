import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { IBcryptService } from '@app/application/common/adapters/bcrypt.interface';

interface BcryptModuleOptions {
  global?: boolean;
}

@Module({})
export class BcryptModule {
  static async register({ global = false }: BcryptModuleOptions) {
    return {
      global,
      module: BcryptModule,
      providers: [
        {
          provide: IBcryptService,
          useClass: BcryptService,
        },
      ],
      exports: [IBcryptService],
    };
  }
}
