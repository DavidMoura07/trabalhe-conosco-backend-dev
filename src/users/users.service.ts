import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { User } from './entitys/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto) {
    return await this.userRepository.insert(createUserDto);
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async search(keyword: string, pag: number) {
    const arrayKeyword = keyword.split(' ');
    keyword = '%';
    arrayKeyword.forEach(key => {
      keyword += key;
      keyword += '%';
    });
    if (pag > 0) pag--;
    return await this.userRepository
      .createQueryBuilder('user')
      .select()
      .where('user.name ILIKE :key', { key: keyword })
      .orWhere('user.username ILIKE :key', { key: keyword })
      .orderBy('user.priority, user.name')
      .skip(pag * 15)
      .take(15)
      .getMany();
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
    if (userToRemove) {
      return await this.userRepository.remove(userToRemove);
    } else {
      return userToRemove;
    }
  }

  async setPriority(userId: string, priority: number) {
    if (priority <= 0) {
      return 'please, set a priority gratter than zero';
    }
    const user: User = await this.findOne(userId);
    user.priority = priority;
    return await this.update(user);
  }
}
