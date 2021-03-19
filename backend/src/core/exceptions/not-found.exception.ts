import { HttpException, HttpStatus } from '@nestjs/common';
import { capitalize } from '@shared/helpers/string.helpers';

export class NotFoundException extends HttpException {
	constructor(objectName: string) {
		super(`${capitalize(objectName)} not found`, HttpStatus.NOT_FOUND);
	}
}
