import { cleanEnv, num, port, str } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port(),
  MONGO_CONNECTION_STRING: str(),
  WEBSITE_URL: str(),
  SERVER_URL: str(),
  SESSION_SECRET: str(),
  POST_REVALIDATION_KEY: str(),

  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),
  GITHUB_CLIENT_ID: str(),
  GITHUB_CLIENT_SECRET: str(),

  SMTP_USER: str(),
  SMTP_PASSWORD: str(),
  SMTP_HOST: str(),
  SMTP_PORT: num(),
});

export default env;
