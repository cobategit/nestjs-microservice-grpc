import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigService } from './env-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile:
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
          ? false
          : true,
      isGlobal: true,
    }),
  ],
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
