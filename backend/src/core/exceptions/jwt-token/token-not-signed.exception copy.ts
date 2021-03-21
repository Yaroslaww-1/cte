import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenNotSignedException extends HttpException {
	constructor(message: string) {
		super(`Token not signed. Reason:${message}`, HttpStatus.UNAUTHORIZED);
	}
}
