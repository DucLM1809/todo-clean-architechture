import { Module } from '@nestjs/common';
import { ExceptionsService } from './exceptions.service';
import { IException } from '@app/application/common/exceptions/exceptions.interface';

interface ExceptionsModuleOptions {
  global?: boolean;
}

@Module({})
export class ExceptionsModule {
  static async register({ global = false }: ExceptionsModuleOptions) {
    return {
      global,
      module: ExceptionsModule,
      providers: [
        {
          provide: IException,
          useClass: ExceptionsService,
        },
      ],
      exports: [IException],
    };
  }
}
