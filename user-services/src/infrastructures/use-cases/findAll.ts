import { UserM } from "src/domains/models/user.model";
import { UserRepo } from "../repository/user.repo";

export class FindAllUserUseCases {
    constructor(private usersRepository: UserRepo) { }

    async execute(): Promise<UserM[]> {
        return await this.usersRepository.findAll();
    }
}