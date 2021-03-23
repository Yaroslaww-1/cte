import { validateSync } from 'class-validator';
import { OkDto } from '../common';

class LogoutSuccessDto extends OkDto {
  constructor(props: LogoutSuccessDto) {
    super(props);
    validateSync(this);
  }
}

export { LogoutSuccessDto };
