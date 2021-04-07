import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IBackendApplicationConfig } from '@config/backend-application.config';
import { RootModule } from './root.module';
import { ConfigService } from '@nestjs/config';
import { WsAdapter } from '@nestjs/platform-ws';
import { BACKEND_APPLICATION_CONFIG } from '@src/config/config';

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
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    app.setGlobalPrefix('api');

    app.useWebSocketAdapter(new WsAdapter(app));

    await app.listen(config.PORT, config.HOST);

    Logger.log(`Server started on host: ${config.HOST}; port: ${config.PORT};`, BackendApplication.name);
  }
}
