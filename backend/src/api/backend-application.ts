import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IBackendApplicationConfig } from '@config/backend-application.config';
import { ConfigService } from '@nestjs/config';
import { WsAdapter } from '@nestjs/platform-ws';
import * as cookieParser from 'cookie-parser';

import { RootModule } from './root.module';
import { BACKEND_APPLICATION_CONFIG } from '@src/config/config';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { HttpExceptionFilter } from './exception-filters/http.exception-filter';
import { ConfiguredValidationPipe } from './pipes/configured-validation-pipe';

export class BackendApplication {
  public static new(): BackendApplication {
    return new BackendApplication();
  }

  public async run(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(RootModule, {
      bodyParser: true,
    });
    app.useWebSocketAdapter(new WsAdapter(app));

    const configService = app.get(ConfigService);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const config = configService.get<IBackendApplicationConfig>(BACKEND_APPLICATION_CONFIG)!;

    console.log('BACKEND_APPLICATION_CONFIG', config);

    app.enableCors({ origin: config.FRONTEND_APP_URL, credentials: true, optionsSuccessStatus: 200 });
    app.use(loggerMiddleware);
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.useGlobalPipes(ConfiguredValidationPipe.new());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    await app.listen(config.PORT, config.HOST);

    Logger.log(`Server started on host: ${config.HOST}; port: ${config.PORT};`, BackendApplication.name);
  }
}
