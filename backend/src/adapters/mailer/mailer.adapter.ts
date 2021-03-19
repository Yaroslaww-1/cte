import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MAILER_CONFIG } from '@src/config/config';
import { IMailerConfig } from '@src/config/mailer.config';
import * as nodemailer from 'nodemailer';
import * as pug from 'pug';

type MessageConfig = {
	templatePath: string;
	letterSubject: string;
	payload: {
		confirmationLink: string;
	};
};

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

	async sendMail(recipient: string, messageConfig: MessageConfig): Promise<void> {
		const message = pug.renderFile(messageConfig.templatePath, messageConfig.payload);
		this.transporter.sendMail({
			from: this.sender,
			to: recipient,
			subject: messageConfig.letterSubject,
			html: message,
		});
	}
}
