import { CookieEntity } from '@src/api/common/entities/cookie.entity';
import { IsString, ValidateNested, validateSync } from 'class-validator';

class LoginResponse {
	@IsString()
	readonly accessToken!: string;

	@IsString()
	readonly refreshToken!: string;

	@ValidateNested({ each: true })
	readonly cookies!: CookieEntity[];

	constructor(props: LoginResponse) {
		Object.assign(this, props);
		validateSync(this);
	}
}

export { LoginResponse };
