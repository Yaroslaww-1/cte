import { Module } from '@nestjs/common';
import { MailerModule } from '@src/adapters/mailer/mailer.module';
import { ConfirmEmailService } from './services/emails/confirm-email.service';

@Module({
	imports: [MailerModule],
	providers: [ConfirmEmailService],
	exports: [ConfirmEmailService],
})
export class EmailsModule {}
