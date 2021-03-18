/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IBackendApplicationConfig } from './backend-application.config';
import { IDatabaseConfig } from './database.config';
import { IMailerConfig } from './mailer.config';

export const BACKEND_APPLICATION_CONFIG = 'BACKEND_APPLICATION';
export const DATABASE_CONFIG = 'DATABASE';
export const MAILER_CONFIG = 'MAILER';

export const configFactory = () => ({
	[BACKEND_APPLICATION_CONFIG]: {
		PORT: parseInt(process.env.PORT || '', 10) || 5001,
		HOST: process.env.HOST || 'localhost',
	} as IBackendApplicationConfig,
	[DATABASE_CONFIG]: {
		CONNECTION_URL: process.env.DATABASE_URL,
	} as IDatabaseConfig,
	[MAILER_CONFIG]: {
		MAILER_HOST: process.env.MAILER_HOST,
    	MAILER_PORT: parseInt(process.env.MAILER_PORT || '', 10),
    	EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
    	EMAIL_PASS: process.env.EMAIL_PASS,
	} as IMailerConfig,
});
