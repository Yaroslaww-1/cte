import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { classToPlain } from 'class-transformer';
import { MailerAdapter } from '@src/adapters/mailer/mailer.adapter';
import { IBackendApplicationConfig } from '@src/config/backend-application.config';
import { BACKEND_APPLICATION_CONFIG } from '@src/config/config';
import { JwtService } from '../../shared/jwt.service';
import { EMAIL_CONFIRM_TOKEN_EXPIRES_IN_MILLISECONDS, EMAIL_CONFIRM_TOKEN_TYPE } from '../constants';
import { EmailConfirmTokenPayloadEntity } from '../entities/email-confirm-token-payload.entity';
import { UserEntity } from '../entities/user.entity';
import { UserDao } from '@src/data/dao/user/user.dao';
import { mapUserModelToUserEntity } from '../user.mappings';
import { InvalidEmailConfirmTokenException } from '@src/core/exceptions/auth/invalid-email-confirm-token.exception';
import { EmailConfirmDto, EmailConfirmSuccessDto } from '@shared/dto';

@Injectable()
export class EmailConfirmService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerAdapter: MailerAdapter,
    private readonly configService: ConfigService,
    private readonly userDao: UserDao
  ) {}

  async makeEmailConfirmToken(userEntity: UserEntity): Promise<string> {
    const payload = new EmailConfirmTokenPayloadEntity({
      tokenType: EMAIL_CONFIRM_TOKEN_TYPE,
      userId: userEntity.id,
      // email: userEntity.email,
      // newEmail: userEntity.newEmail,
      newEmail: userEntity.email,
      // TODO: uncomment
      // iss,
    });

    const config = {
      payload: classToPlain(payload),

      options: {
        algorithm: 'HS512',
        subject: userEntity.id.toString(),
        expiresIn: EMAIL_CONFIRM_TOKEN_EXPIRES_IN_MILLISECONDS,
      },
    };

    return await this.jwtService.sign(config.payload, config.options);
  }

  async sendConfirmEmail(userEmail: string, emailConfirmToken: string): Promise<void> {
    const frontendAppUrl = this.configService.get<IBackendApplicationConfig>(BACKEND_APPLICATION_CONFIG)
      ?.FRONTEND_APP_URL;

    this.mailerAdapter.sendMail(userEmail, {
      templatePath: './templates/confirmEmail.pug',
      payload: {
        confirmationLink: `${frontendAppUrl}/auth/confirm-email?emailConfirmToken=${emailConfirmToken}`,
      },
      letterSubject: 'Please confirm your email address',
    });
  }

  // TODO: move to controller mapper
  async confirmEmail(emailConfirmDto: EmailConfirmDto): Promise<EmailConfirmSuccessDto> {
    const { emailConfirmToken } = emailConfirmDto;
    const tokenPayload = await this.jwtService.verify<EmailConfirmTokenPayloadEntity>(emailConfirmToken);
    // TODO: take newEmail from user entity if we need resend confirm new email action
    const { userId, newEmail } = tokenPayload;

    const userModel = await this.userDao.findOne({ id: userId });
    if (!userModel || userModel.emailConfirmToken !== emailConfirmToken) {
      throw new InvalidEmailConfirmTokenException();
    }
    const user = mapUserModelToUserEntity(userModel);
    await this.userDao.updateOne(user.id, {
      email: newEmail,
      emailConfirmToken: undefined,
    });

    return new EmailConfirmSuccessDto({ message: `${newEmail} confirmed` });
  }
}
