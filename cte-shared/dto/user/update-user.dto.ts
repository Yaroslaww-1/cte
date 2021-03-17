import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class UpdateUserDto {
	@IsString()
	readonly name!: string;

	constructor(props: UpdateUserDto) {
		Object.assign(this, props);
	}
}
