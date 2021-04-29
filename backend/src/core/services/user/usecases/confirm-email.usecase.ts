import { Injectable } from '@nestjs/common';

import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { ConfirmEmailTokenPayloadDto } from '@shared/dto';
import { UserDao } from '@src/data/dao/user/user.dao';
import { ConfirmEmailRequest, ConfirmEmailSuccessResponse } from '@shared/request-response/user';
import { JwtService } from '../../shared/jwt.service';
import { InvalidEmailConfirmTokenException } from '@src/core/exceptions/auth/invalid-email-confirm-token.exception';

@Injectable()
class ConfirmEmailUsecase implements IBaseUsecase<ConfirmEmailRequest, ConfirmEmailSuccessResponse> {
  constructor(private readonly userDao: UserDao, private readonly jwtService: JwtService) {}

  async execute(emailConfirmRequest: ConfirmEmailRequest): Promise<ConfirmEmailSuccessResponse> {
    const { confirmEmailToken } = emailConfirmRequest;
    const tokenPayload = await ConfirmEmailTokenPayloadDto.new(
      ConfirmEmailTokenPayloadDto,
      await this.jwtService.verify(confirmEmailToken),
    );
    // TODO: take newEmail from user entity if we need resend confirm new email action
    const { userId, newEmail } = tokenPayload;

    const user = await this.userDao.findOne({ id: userId });

    if (!user || user.confirmEmailToken !== confirmEmailToken) {
      throw new InvalidEmailConfirmTokenException();
    }

    await this.userDao.updateOne(user.id, {
      email: newEmail,
      confirmEmailToken: null,
    });

    return await ConfirmEmailSuccessResponse.new(ConfirmEmailSuccessResponse, { message: `${newEmail} confirmed` });
  }
}

export { ConfirmEmailUsecase };
