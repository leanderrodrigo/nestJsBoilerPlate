import { CosmosClient, Container } from '@azure/cosmos';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { AzureVaultService } from 'src/azure-vault/azure-vault.service';

interface CosmosDbConstructorDTO {
  databaseName: string;
  containerName: string;
}

@Injectable()
export class CosmosDbService {
  private client;
  constructor(
    private configService: ConfigService, 
    // private azureVaultService: AzureVaultService
    ) {}
  async initializeClient(): Promise<void> {
    // const cosmosUrlKey = this.configService.get<string>('COSMOS_URL_KEY');
    // const cosmosIdKey = this.configService.get<string>('COSMOS_KEY');
    let cosmosUrl = this.configService.get<string>('peopleapicosmosurl');
    console.log(cosmosUrl);
    let cosmosId = this.configService.get<string>('peopleapicosmoskey');

    // try {
    //     const vaultClient = await this.azureVaultService.getVaultClient();
    //     cosmosUrl = await vaultClient.getSecret(cosmosUrlKey);
    //     cosmosId = await vaultClient.getSecret(cosmosIdKey);
    // } catch (error) {
    //     throw new HttpException("Key Vault error", 500);
    // }

    try {
        this.client = new CosmosClient({
            endpoint: cosmosUrl,
            key: cosmosId
        });
    } catch (error) {
      throw new HttpException('Cosmos Client error', 500);
    }
  }

  async getCosmosDbContainer({
    databaseName,
    containerName,
  }: CosmosDbConstructorDTO): Promise<Container> {
    if (!this.client) {
      await this.initializeClient();
    }
    const database = this.client.database(databaseName);
    return database.container(containerName);
  }
}
