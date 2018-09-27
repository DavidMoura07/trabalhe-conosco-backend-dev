import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { User } from './entitys/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as FastCsv from 'fast-csv';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = this.userRepository.save(createUserDto);
    return await createdUser;
  }

  async findOne(userId: string): Promise<User> {
    return await this.userRepository.findOne(userId);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async update(user: User): Promise<User> {
    const oldUser: User = await this.findOne(user.id);
    oldUser.name = user.name;
    oldUser.username = user.username;
    oldUser.priority = user.priority;
    return await this.userRepository.save(oldUser);

  }

  async delete(id: string): Promise<User> {
    console.log('DELETE:  ' + id);
    const userToRemove: User = await this.findOne(id);
    const deletedUser = this.userRepository.remove(userToRemove);
    return await deletedUser;
  }

  async PopulatefromFile(arquivo: string){
    let i = 0;
    // tslint:disable-next-line:prefer-const
    let users: CreateUserDto[];
    FastCsv
    .fromPath('./src/database/csv/' + arquivo)
    .on('data',  async data => {
        const user: CreateUserDto = new CreateUserDto(data[0], data[1], data[2], 0);
        const newUser = this.userRepository.save(user);
        users.push(await newUser);
        i++;
    })
    .on('end', () => {
        // tslint:disable-next-line:no-console
        console.log('Database successfully populated!!!\nWas inserted ' + i + ' new rows');
        return users;
    });
  }

}