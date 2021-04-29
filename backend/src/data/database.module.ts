import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { knexConnectionFactory } from './knex-connection';
import { UserModel } from './dao/user/user.model';
import { DocumentModel } from './dao/document/document.model';
import { RefreshSessionModel } from './dao/refresh-session/refresh-session.model';

const models = [UserModel, DocumentModel, RefreshSessionModel];

const modelProviders = models.map(model => ({
  provide: model,
  useValue: model,
}));

const providers = [...modelProviders, DatabaseService, knexConnectionFactory];

@Global()
@Module({
  imports: [ConfigModule],
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
