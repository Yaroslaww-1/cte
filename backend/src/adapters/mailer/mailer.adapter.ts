import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MAILER_CONFIG } from '@src/config/config';
import { IMailerConfig } from '@src/config/mailer.config';
import * as nodemailer from 'nodemailer';
import * as pug from 'pug';

@Injectable()
export class MailerAdapter {
	private transporter;
	private sender;

	constructor(private configService: ConfigService) {
		this.sender = this.configService.get<IMailerConfig>(MAILER_CONFIG)?.EMAIL_ADDRESS;
		this.transporter = nodemailer.createTransport({
			host: this.configService.get<IMailerConfig>(MAILER_CONFIG)?.MAILER_HOST,
			port: this.configService.get<IMailerConfig>(MAILER_CONFIG)?.MAILER_PORT,
			secure: false,
			requireTLS: true,
			auth: {
				user: this.sender,
				pass: this.configService.get<IMailerConfig>(MAILER_CONFIG)?.EMAIL_PASS,
			},
		});
	}

	async sendConfirmEmailLetter(recipient: string, link: string): Promise<void> {
		const message = pug.renderFile('./templates/confirmEmail.pug', {
			confirmationLink: link,
		});
		this.transporter.sendMail({
			from: this.sender,
			to: recipient,
			subject: 'Please confirm your email address',
			html: message,
		});
	}
}
