import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { classToPlain } from 'class-transformer';

import { MailerAdapter } from '@src/adapters/mailer/mailer.adapter';
import { IBackendApplicationConfig } from '@src/config/backend-application.config';
import { BACKEND_APPLICATION_CONFIG } from '@src/config/config';
import { JwtService } from '../../shared/jwt.service';
import { EMAIL_CONFIRM_TOKEN_EXPIRES_IN_MILLISECONDS, EMAIL_CONFIRM_TOKEN_TYPE } from '../constants';
import { UserEntity } from '../entities/user.entity';
import { UserDao } from '@src/data/dao/user/user.dao';
import { ConfirmEmailTokenPayloadDto } from '@shared/dto/auth';
import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';

@Injectable()
class SendConfirmEmailUsecase implements IBaseUsecase<UserEntity, void> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerAdapter: MailerAdapter,
    private readonly configService: ConfigService,
    private readonly userDao: UserDao,
  ) {}

  async execute(user: UserEntity): Promise<void> {
    const frontendAppUrl = this.configService.get<IBackendApplicationConfig>(BACKEND_APPLICATION_CONFIG)
      ?.FRONTEND_APP_URL;

    const userEmail = user.email;
    const confirmEmailToken = await this.makeConfirmEmailToken(user);

    await this.userDao.updateOne(user.id, { confirmEmailToken });

    await this.mailerAdapter.sendMail(userEmail, {
      templatePath: 'src/adapters/mailer/templates/confirmEmail.pug',
      payload: {
        confirmationLink: `${frontendAppUrl}/confirm-email?confirmEmailToken=${confirmEmailToken}`,
      },
      letterSubject: 'Please confirm your email address',
    });
  }

  private async makeConfirmEmailToken(userEntity: UserEntity): Promise<string> {
    const payload = await ConfirmEmailTokenPayloadDto.new(ConfirmEmailTokenPayloadDto, {
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
}

export { SendConfirmEmailUsecase };
