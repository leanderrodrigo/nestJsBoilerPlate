import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureVaultService {
  private client;
  constructor(private configService: ConfigService) {}
  initializeClient() {
    try {
      const credential = new DefaultAzureCredential();
      const keyVaultName = this.configService.get<string>('KEY_VAULT_NAME');
      const url = 'https://' + keyVaultName + '.vault.azure.net';
      this.client = new SecretClient(url, credential);
    } catch (error) {
      throw new HttpException('Key Vault error', 500);
    }
  }
  async getVaultClient(): Promise<SecretClient> {
    if (!this.client) {
      await this.initializeClient();
    }
    return this.client;
  }
}
