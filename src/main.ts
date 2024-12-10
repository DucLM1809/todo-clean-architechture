import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './application/common/filter/exception.filter';
import { LoggerService } from './infrastructure/common/logger/logger.service';
import { LoggingInterceptor } from './application/common/interceptors/logger.interceptor';
import {
  ResponseFormat,
  ResponseInterceptor,
} from './application/common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentConfigService } from './infrastructure/config/environment-config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    rawBody: true,
  });

  const configService = app.get(EnvironmentConfigService);
  const port = configService.get('PORT');

  // Filters
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Interceptors
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Base routing
  app.setGlobalPrefix('/api/v1');

  // Swagger config

  function getSwaggerServerUrl() {
    switch (process.env.NODE_ENV) {
      case 'production':
        return 'https://nestjs-ecommerce-alpha.vercel.app';
      default:
        return `http://localhost:${port}`;
    }
  }

  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Clean Architechture')
      .setDescription('Todo list')
      .setVersion('1.0')
      .addServer(getSwaggerServerUrl())
      .build();

    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });

    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(port);
}
bootstrap();
