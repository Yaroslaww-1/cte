import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class CreateUserDto {
	@IsString()
	readonly name!: string;

	constructor(props: CreateUserDto) {
		Object.assign(this, props);
	}
}
