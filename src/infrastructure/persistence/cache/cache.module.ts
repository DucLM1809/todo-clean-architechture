import {
  EnvironmentConfigModule,
  EnvironmentConfigService,
} from '@app/infrastructure/config/environment-config';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: false,
      imports: [EnvironmentConfigModule],
      useFactory: async (configService: EnvironmentConfigService) => ({
        ttl: configService.get('CACHE_TTL'),
        max: configService.get('CACHE_MAX'),
      }),
      inject: [EnvironmentConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class CacheManagerModule {}
