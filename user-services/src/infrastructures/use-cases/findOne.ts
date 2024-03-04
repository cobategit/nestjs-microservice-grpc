import { UserM } from "src/domains/models/user.model";
import { UserRepo } from "../repository/user.repo";
import { FindOneOptions } from "typeorm";

export class FindOneUserUseCases {
    constructor(private usersRepository: UserRepo) { }

    async execute(query: FindOneOptions): Promise<UserM> {
        return await this.usersRepository.findOne(query);
    }
}