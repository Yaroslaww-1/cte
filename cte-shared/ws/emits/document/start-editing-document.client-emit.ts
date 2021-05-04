import { Exclude, Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { BaseDto } from '../../../abstraction/base-dto';

@Exclude()
class StartEditingDocumentClientEmit extends BaseDto<StartEditingDocumentClientEmit> {
  @Expose()
  @IsUUID(4)
  readonly userId!: string;
}

export { StartEditingDocumentClientEmit };
