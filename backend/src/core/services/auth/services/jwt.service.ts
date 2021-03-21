import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '@src/config/config';
import { IJwtConfig } from '@src/config/jwt.config';
import { jwtVerify, jwtSign, JwtPayloadType, JwtSignOptions } from '@src/core/lib/jwt.lib';

@Injectable()
export class JwtService {
	private SECRET: string;

	constructor(private configService: ConfigService) {
		const SECRET = configService.get<IJwtConfig>(JWT_CONFIG)?.SECRET;
		if (!SECRET) {
			throw new Error('Jwt secret is not set!');
		}
		this.SECRET = SECRET;
	}

	async verify(token: string): Promise<boolean> {
		return await jwtVerify(this.SECRET)(token);
	}

	async sign(payload: JwtPayloadType, options: JwtSignOptions): Promise<string> {
		return await jwtSign(this.SECRET)(payload, options);
	}
}
