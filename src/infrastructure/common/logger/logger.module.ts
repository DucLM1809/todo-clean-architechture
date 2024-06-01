import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ILogger } from '@app/application/common/logger/logger.interface';

interface LoggerModuleOptions {
  global?: boolean;
}

@Module({})
export class LoggerModule {
  static async register({ global = false }: LoggerModuleOptions) {
    return {
      global,
      module: LoggerModule,
      providers: [
        {
          provide: ILogger,
          useClass: LoggerService,
        },
      ],
      exports: [ILogger],
    };
  }
}
