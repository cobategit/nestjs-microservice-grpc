import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/domains/dtos/user";
import { IUserRepo } from "src/domains/interfaces/repository/user.repo";
import { UserM } from "src/domains/models/user.model";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class UserRepo implements IUserRepo {
    constructor(
        @InjectRepository(UserM)
        private readonly userRepository: Repository<UserM>,
    ) { }

    async findAll(): Promise<UserM[]> {
        const users = await this.userRepository.find();
        return users
    }

    async findOne(query: FindOneOptions): Promise<UserM> {
        const users = await this.userRepository.findOne(query);

        return users
    }

    async create(createUserDto: CreateUserDto): Promise<UserM> {
        const user = new UserM();
        user.email = createUserDto.email;
        user.name = createUserDto.name;
        user.prof_pict = createUserDto.prof_pict
        return this.userRepository.save(user);
    }
}
