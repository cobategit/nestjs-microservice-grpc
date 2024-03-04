import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigModule } from "../configs/db.module";
import { UserRepo } from "./user.repo";
import { UserM } from "src/domains/models/user.model";

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([UserM])],
  providers: [UserRepo],
  exports: [UserRepo],
})
export class UserRepoModule {}
