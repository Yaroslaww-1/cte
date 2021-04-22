import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, DocumentModule, AuthModule],
})
export class HttpRootModule {}
