/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IBackendApplicationConfig } from './backend-application.config';
import { IDatabaseConfig } from './database.config';

export default () => ({
	BACKEND_APPLICATION: {
		PORT: parseInt(process.env.PORT || '', 10) || 5001,
		HOST: process.env.HOST || 'localhost',
	} as IBackendApplicationConfig,
	DATABASE: {
		CONNECTION_URL: process.env.DATABASE_URL,
	} as IDatabaseConfig,
});
