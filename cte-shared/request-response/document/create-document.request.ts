import { Exclude, Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class CreateDocumentRequest extends BaseDto<CreateDocumentRequest> {
  @Expose()
  @IsUUID(4)
  readonly userId!: string;

  @Expose()
  @IsString()
  readonly title!: string;
}

export { CreateDocumentRequest };
