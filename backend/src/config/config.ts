/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IBackendApplicationConfig } from './backend-application.config';
import { IDatabaseConfig } from './database.config';
import { IJwtConfig } from './jwt.config';

export const BACKEND_APPLICATION_CONFIG = 'BACKEND_APPLICATION';
export const DATABASE_CONFIG = 'DATABASE';
export const JWT_CONFIG = 'JWT';

export const configFactory = () => ({
	[BACKEND_APPLICATION_CONFIG]: {
		PORT: parseInt(process.env.PORT || '', 10) || 5001,
		HOST: process.env.HOST || 'localhost',
	} as IBackendApplicationConfig,
	[DATABASE_CONFIG]: {
		CONNECTION_URL: process.env.DATABASE_URL,
	} as IDatabaseConfig,
	[JWT_CONFIG]: {
		SECRET: process.env.JWT_SECRET,
	} as IJwtConfig,
});
