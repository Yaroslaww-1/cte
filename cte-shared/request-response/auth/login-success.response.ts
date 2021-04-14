import { IsString, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

class LoginSuccessResponse extends BaseDto<LoginSuccessResponse> {
  @IsString()
  readonly accessToken!: string;

  @IsUUID(4)
  readonly refreshTokenId!: string;
}

export { LoginSuccessResponse };
