import { IsString, IsNumber, validateSync, IsBoolean, ValidateNested } from 'class-validator';

class CookieOptions {
	@IsNumber()
	readonly maxAge?: number;

	@IsString()
	readonly domain?: string;

	@IsString()
	readonly path?: string;

	@IsBoolean()
	readonly httpOnly?: boolean;

	@IsBoolean()
	readonly signed?: boolean;

	@IsBoolean()
	readonly secure?: boolean;

	readonly sameSite?: boolean | 'lax' | 'strict' | 'none';

	constructor(props: CookieOptions) {
		Object.assign(this, props);
		validateSync(this);
	}
}

class CookieEntity {
	@IsString()
	readonly name!: string;

	@IsString()
	readonly value!: string;

	@ValidateNested()
	readonly options!: CookieOptions;

	constructor(props: CookieEntity) {
		Object.assign(this, props);
		validateSync(this);
	}
}

export { CookieEntity, CookieOptions };
