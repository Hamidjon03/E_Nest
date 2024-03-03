import * as dotenv from 'dotenv';
import { IConfig } from '../interfaces/interface';
dotenv.config();

export const config: IConfig = {
  serverPort: Number(process.env.PORT),
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiredIn: process.env.JWT_EXPIRED_IN,
  databaseUrl: process.env.DB_URL,
};
