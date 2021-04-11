import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AccessTokenPayloadDto } from '@shared/dto';

const AccessTokenPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AccessTokenPayloadDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.accessTokenPayload;
  },
);

export { AccessTokenPayload };
