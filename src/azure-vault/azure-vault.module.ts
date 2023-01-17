import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AzureVaultService } from './azure-vault.service';

@Module({
  exports: [AzureVaultService],
  providers: [
    {
      provide: AzureVaultService,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const azureVaultService = new AzureVaultService(configService);
        await azureVaultService.initializeClient();
        return azureVaultService;
      },
    },
  ],
})
export class AzureVaultModule {}
