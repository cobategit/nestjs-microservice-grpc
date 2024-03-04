import { CreateUserDto } from "src/domains/dtos/user";
import { UserRepo } from "../repository/user.repo";
import { UserM } from "src/domains/models/user.model";

export class CreateUserUseCases {
    constructor(private usersRepository: UserRepo) { }

    async execute(createUserDto: CreateUserDto): Promise<UserM> {
        return this.usersRepository.create(createUserDto);
    }
}