import { v4 as uuidv4 } from 'uuid';
import { IsString, IsUUID, IsIP, IsNumber, validateSync } from 'class-validator';

class RefreshSessionEntity {
	@IsUUID(4)
	readonly refreshToken!: string;

	@IsNumber()
	readonly userId!: number;

	@IsString()
	readonly fingerprint!: string;

	@IsIP()
	readonly ip!: string;

	@IsNumber()
	readonly expiresIn!: number;

	@IsString()
	readonly userAgent: string | undefined;

	constructor(props: Omit<RefreshSessionEntity, 'refreshToken'>) {
		Object.assign(this, {
			...props,
			refreshToken: uuidv4(),
		});
		validateSync(this);
	}
}

export { RefreshSessionEntity };
