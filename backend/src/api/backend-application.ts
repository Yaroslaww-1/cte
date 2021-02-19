import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
dotenv.config();
import { BackendApplicationConfig } from '@config/backend-application.config';
import { RootModule } from './http/modules/root.module';

export class BackendApplication {
  private readonly host: string = BackendApplicationConfig.HOST;
  private readonly port = BackendApplicationConfig.PORT;

  public static new(): BackendApplication {
    return new BackendApplication();
  }

  public async run(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(RootModule, {
      bodyParser: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    app.setGlobalPrefix('api');

    await app.listen(this.port, this.host);

    Logger.log(`Server started on host: ${this.host}; port: ${this.port};`, BackendApplication.name);
  }
}
