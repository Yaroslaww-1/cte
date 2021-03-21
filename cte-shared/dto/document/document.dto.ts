import { Expose } from 'class-transformer';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { UserDto } from '../user';

@Expose()
export class DocumentDto {
	@IsNumber()
	readonly id!: number;

	@IsString()
	readonly title!: string;

	@IsObject()
	readonly user!: UserDto;

	constructor(props: DocumentDto) {
		Object.assign(this, props);
	}
}
