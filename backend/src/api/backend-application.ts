import { NestFactory } from '@nestjs/core';
import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IBackendApplicationConfig } from '@config/backend-application.config';
import { ConfigService } from '@nestjs/config';
import { WsAdapter } from '@nestjs/platform-ws';
import * as cookieParser from 'cookie-parser';

import { RootModule } from './root.module';
import { BACKEND_APPLICATION_CONFIG } from '@src/config/config';
import { loggerMiddleware } from './middlewares/logger.middleware';

export class BackendApplication {
  public static new(): BackendApplication {
    return new BackendApplication();
  }

  public async run(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(RootModule, {
      bodyParser: true,
    });

    const configService = app.get(ConfigService);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const config = configService.get<IBackendApplicationConfig>(BACKEND_APPLICATION_CONFIG)!;

    app.enableCors({ origin: config.FRONTEND_APP_URL, credentials: true, optionsSuccessStatus: 200 });
    app.use(loggerMiddleware);
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        transformOptions: { enableImplicitConversion: true },
        exceptionFactory: (validationErrors: ValidationError[] = []): BadRequestException => {
          return new BadRequestException(validationErrors);
        },
      }),
    );

    app.useWebSocketAdapter(new WsAdapter(app));

    await app.listen(config.PORT, config.HOST);

    Logger.log(`Server started on host: ${config.HOST}; port: ${config.PORT};`, BackendApplication.name);
  }
}
