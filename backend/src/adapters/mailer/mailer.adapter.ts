import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MAILER_CONFIG } from '@src/config/config';
import { IMailerConfig } from '@src/config/mailer.config';
import { MessageConfig } from './message-config';
import * as nodemailer from 'nodemailer';
import * as pug from 'pug';

@Injectable()
export class MailerAdapter {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<IMailerConfig>(MAILER_CONFIG)?.MAILER_HOST,
      port: this.configService.get<IMailerConfig>(MAILER_CONFIG)?.MAILER_PORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: this.configService.get<IMailerConfig>(MAILER_CONFIG)?.EMAIL_ADDRESS,
        pass: this.configService.get<IMailerConfig>(MAILER_CONFIG)?.EMAIL_PASS,
      },
    });
  }

  async sendMail(recipient: string, messageConfig: MessageConfig): Promise<void> {
    const message = pug.renderFile(messageConfig.templatePath, messageConfig.payload);
    this.transporter.sendMail({
      from: this.configService.get<IMailerConfig>(MAILER_CONFIG)?.EMAIL_ADDRESS,
      to: recipient,
      subject: messageConfig.letterSubject,
      html: message,
    });
  }
}
