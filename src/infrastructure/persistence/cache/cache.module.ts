import {
  EnvironmentConfigModule,
  EnvironmentConfigService,
} from '@app/infrastructure/config/environment-config';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: false,
      imports: [EnvironmentConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('CACHE_TTL'),
        store: configService.get('CACHE_MAX'),
      }),
      inject: [EnvironmentConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class CacheManagerModule {}
