import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domains/interfaces/configs/db.config';

@Injectable()
export class EnvConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}
    getDatabaseSync(): boolean {
        throw new Error('Method not implemented.');
    }

  getDatabaseHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DB_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DB_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DB_NAME');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DB_SCHEMA');
  }
}
