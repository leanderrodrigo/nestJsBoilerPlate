import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';


export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      schema: configService.get('DB_SCHEMA'),
      type: 'mssql',
      host: configService.get('DB_HOST'),
      port: 1433,
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      synchronize: false,
      entities: [],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    };
  },
};
