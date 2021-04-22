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
    PORT: parseInt(process.env.BACKEND_PORT || '', 10) || 5001,
    HOST: process.env.BACKEND_HOST || 'localhost',
    FRONTEND_APP_URL: process.env.BACKEND_FRONTEND_APP_URL,
    BACKEND_COOKIE_DOMAIN: process.env.BACKEND_COOKIE_DOMAIN || 'localhost',
  } as IBackendApplicationConfig,
  [DATABASE_CONFIG]: {
    CONNECTION_URL: process.env.BACKEND_DATABASE_URL,
  } as IDatabaseConfig,
  [JWT_CONFIG]: {
    SECRET: process.env.BACKEND_JWT_SECRET,
  } as IJwtConfig,
  [MAILER_CONFIG]: {
    EMAIL_ADDRESS: process.env.BACKEND_MAILER_EMAIL_ADDRESS,
    EMAIL_PASSWORD: process.env.BACKEND_MAILER_EMAIL_PASSWORD,
  } as IMailerConfig,
});
