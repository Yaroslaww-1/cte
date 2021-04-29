import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AccessTokenPayloadDto } from '@shared/dto';

const AccessTokenPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Promise<AccessTokenPayloadDto> => {
    const req = ctx.switchToHttp().getRequest();
    const accessTokenPayload = req.accessTokenPayload;
    return AccessTokenPayloadDto.new(AccessTokenPayloadDto, accessTokenPayload);
  },
);

export { AccessTokenPayload };
