import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
const configService = new ConfigService();

export const typeOrmConfig = new DataSource({
  schema: 'dbo',
  type: 'mssql',
  host: configService.get('DB_HOST'),
  port: 1433,
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  /**
   * ATTENTION - Synchronize
   *
   * Do NOT turn this ON when pointing to a database on the cloud.
   * This is ONLY for local development.
   */
  synchronize: false,
  options: { encrypt: true },
  entities: [],
  migrations: [__dirname + '/../migrations/*{.ts,.js}']
});
