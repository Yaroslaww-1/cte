import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, DocumentModule, AuthModule, GoogleAuthModule],
})
export class HttpRootModule {}
