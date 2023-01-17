import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CosmosDbModule } from 'src/cosmos-db/cosmos-db.module';
import { TestController } from './test.controller';
import { TestUser } from './test.model';
import { TestService } from './test.service';

@Module({
  imports: [SequelizeModule.forFeature([TestUser]), CosmosDbModule],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
