/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IBackendApplicationConfig } from './backend-application.config';
import { IDatabaseConfig } from './database.config';
import { IJwtConfig } from './jwt.config';
import { IMailerConfig } from './mailer.config';

export const BACKEND_APPLICATION_CONFIG = 'BACKEND_APPLICATION';
export const DATABASE_CONFIG = 'DATABASE';
export const JWT_CONFIG = 'JWT';
export const MAILER_CONFIG = 'MAILER';

export const configFactory = () => ({
  [BACKEND_APPLICATION_CONFIG]: {
    PORT: parseInt(process.env.PORT || '', 10) || 5001,
    HOST: process.env.HOST || 'localhost',
    FRONTEND_APP_URL: process.env.FRONTEND_APP_URL,
  } as IBackendApplicationConfig,
  [DATABASE_CONFIG]: {
    CONNECTION_URL: process.env.DATABASE_URL,
  } as IDatabaseConfig,
  [JWT_CONFIG]: {
    SECRET: process.env.JWT_SECRET,
  } as IJwtConfig,
  [MAILER_CONFIG]: {
    EMAIL_ADDRESS: process.env.MAILER_EMAIL_ADDRESS,
    EMAIL_PASSWORD: process.env.MAILER_EMAIL_PASSWORD,
  } as IMailerConfig,
});
