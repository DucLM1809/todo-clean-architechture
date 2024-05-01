import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './environment-config.validation';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  get<T extends keyof Env>(key: T): T {
    return this.configService.get(key, { infer: true });
  }
}
