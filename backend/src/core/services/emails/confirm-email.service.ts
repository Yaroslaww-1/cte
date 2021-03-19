import { Injectable } from '@nestjs/common';
import { MailerAdapter } from '@src/adapters/mailer/mailer.adapter';

@Injectable()
export class ConfirmEmailService {
	constructor(private mailerAdapter: MailerAdapter) {}
	async sendConfirmEmailLetter(recipient: string, link: string): Promise<void> {
		this.mailerAdapter.sendMail(recipient, {
			templatePath: './templates/confirmEmail.pug',
			payload: {
				confirmationLink: link,
			},
			letterSubject: 'Please confirm your email address',
		});
	}
}
