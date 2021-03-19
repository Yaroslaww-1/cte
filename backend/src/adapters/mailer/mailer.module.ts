import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerAdapter } from './mailer.adapter';

@Module({
	imports: [ConfigModule],
	providers: [MailerAdapter],
	exports: [MailerAdapter],
})
export class MailerModule {}
