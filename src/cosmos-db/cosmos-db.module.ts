import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { AzureVaultModule } from 'src/azure-vault/azure-vault.module';
import { AzureVaultService } from 'src/azure-vault/azure-vault.service';
import { CosmosDbService } from './cosmos-db.service';

@Module({
    // imports: [AzureVaultModule],
    providers: [{
        provide: CosmosDbService,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const cosmosDbService = new CosmosDbService(configService);
            await cosmosDbService.initializeClient();
            return cosmosDbService;
        }
    }],
    exports: [CosmosDbService]
})
export class CosmosDbModule {}
