import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './environment-config.validation';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
