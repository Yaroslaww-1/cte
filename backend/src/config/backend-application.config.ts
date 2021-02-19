export const BackendApplicationConfig = {
  HOST: process.env.APP_HOST || 'localhost',
  PORT: parseInt(process.env.APP_PORT, 10) || 5001,
};