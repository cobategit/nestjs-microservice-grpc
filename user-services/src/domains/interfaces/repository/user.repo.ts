import { CreateUserDto } from "src/domains/dtos/user";
import { UserM } from "src/domains/models/user.model";
import { FindOneOptions } from "typeorm";

export interface IUserRepo {
    create(data: CreateUserDto): Promise<UserM>
    findAll(): Promise<UserM[]>
    findOne(query: FindOneOptions): Promise<UserM >
}