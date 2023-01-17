import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CosmosDbService } from 'src/cosmos-db/cosmos-db.service';
import { TestUser } from './test.model';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(TestUser)
    private testUserModel: typeof TestUser,
    private cosmosDbService: CosmosDbService,
  ) {}

  async findAll(): Promise<TestUser[]> {
    return this.testUserModel.findAll();
  }

  async testCosmos(): Promise<any> {
    const cosmosClient = await this.cosmosDbService.getCosmosDbContainer({
      databaseName: 'ToDoList',
      containerName: 'Items',
    });
    const { resources: items } = await cosmosClient.items
      .query('select * from c')
      .fetchAll();
    return items;
  }
}
