import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from 'src/@core/infra/typeorm/config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckModule } from 'src/health-check/health-check.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: ['.env', '.env.development', '.env.production']
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    HealthCheckModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
