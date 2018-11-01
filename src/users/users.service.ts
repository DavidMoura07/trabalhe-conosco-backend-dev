import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { User } from './entitys/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as Csv from 'fast-csv';
import * as Fs from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto) {
    // Verifica se já existe, caso sim, atualiza o usuario. Menor desempenho
    // const createdUser = this.userRepository.save(createUserDto);

    // Apenas insere, caso já exista retorna um erro. Maior desempenho.
    const createdUser = await this.userRepository.insert(createUserDto);
    return await createdUser;
  }

  async findOne(userId: string): Promise<User> {
    return await this.userRepository.findOne(userId);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async search(keyword: string, pag: number) {
    const arrayKeyword = keyword.split(' ');
    keyword = '%';
    arrayKeyword.forEach(key => {
      keyword += key;
      keyword += '%';
    });
    pag > 0 ? pag-- : pag;
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
    const deletedUser = this.userRepository.remove(userToRemove);
    return await deletedUser;
  }

  async loadListaRelevancia() {
    const path: string = './src/database/relevancia/';
    const lists: Array<string> = [
      'lista_relevancia_1.txt',
      'lista_relevancia_2.txt',
    ];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < lists.length; i++) {
      const csvStream = Csv.fromPath(path + lists[i]).on('data', async data => {
        data.forEach(idUser => {
          this.setPriority(idUser, i + 1);
        });
      });
    }
    return 'Relevancias alteradas';
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
