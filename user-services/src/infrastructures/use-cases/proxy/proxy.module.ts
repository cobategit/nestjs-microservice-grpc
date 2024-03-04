import { DynamicModule, Module } from "@nestjs/common";
import { EnvConfigModule } from "src/infrastructures/configs/env-config.module";
import { UserRepo } from "src/infrastructures/repository/user.repo";
import { UserRepoModule } from "src/infrastructures/repository/user.repo.module";
import { UseCaseProxy } from "./proxy";
import { CreateUserUseCases } from "../create";
import { FindAllUserUseCases } from "../findAll";
import { FindOneUserUseCases } from "../findOne";

@Module({
    imports: [EnvConfigModule, UserRepoModule],
  })
  export class UserUsecaseProxyModule {
    static FIND_ALL_USERS_USE_CASE = 'findAllUsersUsecaseProxy';
    static FIND_ONE_USERS_USE_CASE = 'findOneUsersUsecaseProxy';
    static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';
  
    static register(): DynamicModule {
      return {
        module: UserUsecaseProxyModule,
        providers: [
          {
            inject: [UserRepo],
            provide: UserUsecaseProxyModule.FIND_ALL_USERS_USE_CASE,
            useFactory: (userRepository: UserRepo) =>
              new UseCaseProxy(new FindAllUserUseCases(userRepository)),
          },
          {
            inject: [UserRepo],
            provide: UserUsecaseProxyModule.FIND_ONE_USERS_USE_CASE,
            useFactory: (userRepository: UserRepo) =>
              new UseCaseProxy(new FindOneUserUseCases(userRepository)),
          },
          {
            inject: [UserRepo],
            provide: UserUsecaseProxyModule.CREATE_USER_USE_CASE,
            useFactory: (userRepository: UserRepo) =>
              new UseCaseProxy(new CreateUserUseCases(userRepository)),
          },
        ],
        exports: [
          UserUsecaseProxyModule.FIND_ALL_USERS_USE_CASE,
          UserUsecaseProxyModule.FIND_ONE_USERS_USE_CASE,
          UserUsecaseProxyModule.CREATE_USER_USE_CASE,
        ],
      };
    }
  }
  