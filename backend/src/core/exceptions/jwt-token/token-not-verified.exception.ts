import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenNotVerifiedException extends HttpException {
	constructor(message: string) {
		super(`Token not verified. Reason:${message}`, HttpStatus.UNAUTHORIZED);
	}
}
