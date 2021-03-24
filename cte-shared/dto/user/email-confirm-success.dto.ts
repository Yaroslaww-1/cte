import { validateSync } from 'class-validator';
import { OkDto } from '../common';

class EmailConfirmSuccessDto extends OkDto {
  constructor(props: EmailConfirmSuccessDto) {
    super(props);
    validateSync(this);
  }
}

export { EmailConfirmSuccessDto };
