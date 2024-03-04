import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path'
import { Transport } from '@nestjs/microservices'
import { Logger } from 'nestjs-pino'
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `${process.env.URL}:${process.env.PORT}`,
      package: 'users',
      protoPath: join(__dirname, '../src/protos/users.proto'),
      loader: {
        enums: String,
        objects: true,
        arrays: true
      }
    }
  })

  app.useGlobalFilters(new GrpcServerExceptionFilter());
  app.useLogger(app.get(Logger))

  return app.listen()
}

bootstrap();
