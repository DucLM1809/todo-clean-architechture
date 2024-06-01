import { IException } from '@app/application/common/exceptions/exceptions.interface';
import { DynamicModule, Module } from '@nestjs/common';
import { ExceptionsService } from './exceptions.service';

interface ExceptionsModuleOptions {
  global?: boolean;
}

@Module({})
export class ExceptionsModule {
  static async register({
    global = false,
  }: ExceptionsModuleOptions = {}): Promise<DynamicModule> {
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
