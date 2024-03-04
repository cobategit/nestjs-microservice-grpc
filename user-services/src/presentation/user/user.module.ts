import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { UserController } from "./user.controller";
import { UserUsecaseProxyModule } from "src/infrastructures/use-cases/proxy/proxy.module";
import { APP_FILTER } from "@nestjs/core";
import { GrpcServerExceptionFilter } from "nestjs-grpc-exceptions";

@Module({
    imports: [
      LoggerModule.forRoot({
        pinoHttp: {
          safe: true,
        }
      }),
      UserUsecaseProxyModule.register()
    ],
    controllers: [UserController],
    providers: [
      {
        provide: APP_FILTER,
        useClass: GrpcServerExceptionFilter,
      },
    ]
  })
  export class OrganizationsModule {}