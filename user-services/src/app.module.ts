import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { EnvConfigModule } from './infrastructures/configs/env-config.module';
import { UserUsecaseProxyModule } from './infrastructures/use-cases/proxy/proxy.module';
import { UserController } from './presentation/user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
      }
    }),
    UserUsecaseProxyModule.register(),
    EnvConfigModule
  ],
  controllers: [UserController],
})
export class AppModule {}
