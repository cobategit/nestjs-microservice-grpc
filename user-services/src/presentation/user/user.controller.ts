import { Controller, Inject, UseInterceptors } from "@nestjs/common";
import { GrpcMethod, Payload } from "@nestjs/microservices";
import { GrpcNotFoundException, GrpcToHttpInterceptor } from "nestjs-grpc-exceptions";
import { PinoLogger } from "nestjs-pino";
import { CreateUserDto } from "src/domains/dtos/user";
import { Email, Id } from "src/domains/interfaces/commons";
import { UserM } from "src/domains/models/user.model";
import { CreateUserUseCases } from "src/infrastructures/use-cases/create";
import { FindOneUserUseCases } from "src/infrastructures/use-cases/findOne";
import { UseCaseProxy } from "src/infrastructures/use-cases/proxy/proxy";
import { UserUsecaseProxyModule } from "src/infrastructures/use-cases/proxy/proxy.module";

@Controller('users')
export class UserController {
    constructor(
        @Inject(UserUsecaseProxyModule.CREATE_USER_USE_CASE) private readonly createUser: UseCaseProxy<CreateUserUseCases>,
        @Inject(UserUsecaseProxyModule.FIND_ONE_USERS_USE_CASE) private readonly findOneUser: UseCaseProxy<FindOneUserUseCases>,
        private readonly logger: PinoLogger
    ) {
        logger.setContext(UserController.name)
    }

    @GrpcMethod('UserService', 'findByEmail')
    @UseInterceptors(GrpcToHttpInterceptor)
    async findByEmail(@Payload() data: Email) {
        this.logger.info(`UserController#findByEmail.call: ${JSON.stringify(data)}`)

        const result: UserM = await this.findOneUser.getInstance().execute({
            where: {
                email: data.email
            }
        })

        if (!result) {
            throw new GrpcNotFoundException("Email Not Found");
        }

        this.logger.info(`UserController#findByEmail.result: ${JSON.stringify(result)}`)

        return result
    }

    @GrpcMethod('UserService', 'findById')
    @UseInterceptors(GrpcToHttpInterceptor)
    async findById(@Payload() data: Id) {
        this.logger.info(`UserController#findById.call: ${JSON.stringify(data)}`)

        const result: UserM = await this.findOneUser.getInstance().execute({
            where: {
                id: data.id
            }
        })

        if (!result) {
            throw new GrpcNotFoundException("Id Not Found");
        }

        this.logger.info(`UserController#findById.result: ${JSON.stringify(result)}`)

        return result
    }

    @GrpcMethod('UserService', 'create')
    async create(data: CreateUserDto) {
        const result: UserM = await this.createUser.getInstance().execute(data)

        this.logger.info('UserController#create.result', result)

        return result
    }
}