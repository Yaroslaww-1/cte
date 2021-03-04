import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Expose()
export class UserEntity {
	@IsNumber()
	readonly id: number;

	@IsString()
	readonly name: string;

	constructor(props: UserEntity) {
		Object.assign(this, props);
	}
}
