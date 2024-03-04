import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvConfigService } from './env-config.service';
import { EnvConfigModule } from './env-config.module';
import { join } from 'path';

export const getTypeOrmModuleOptions = (
  config: EnvConfigService,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    entities: [join(__dirname, '../../src/domains/models/*.model{.ts,.js}')],
    autoLoadEntities: true,
    synchronize: false,
    schema: process.env.DATABASE_SCHEMA,
  } as TypeOrmModuleOptions);
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
