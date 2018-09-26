import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { User } from './entitys/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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
    const userToRemove: User = await this.findOne(id);
    const deletedUser = this.userRepository.remove(userToRemove);
    return await deletedUser;
  }

}