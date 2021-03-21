import { Module } from '@nestjs/common';
import { DocumentModule } from './document/document.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [UserModule, DocumentModule],
})
export class HttpRootModule {}
