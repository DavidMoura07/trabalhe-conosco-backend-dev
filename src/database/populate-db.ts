import * as FastCsv from 'fast-csv';
import { UsersService } from 'users/users.service';
import { Repository } from 'typeorm';
import { User } from 'users/entitys/user.entity';
import { CreateUserDto } from 'users/dto/create-user.dto';

export class PopulateDb{

  fromFile(arquivo: string){
    let i = 0;
    FastCsv
    .fromPath('./src/database/csv/' + arquivo)
    .on('data', data => {
        const userService: UsersService = new UsersService(UsersService);
        const user: CreateUserDto = new CreateUserDto(data[0], data[1], data[2], 0);
        // tslint:disable-next-line:no-console
        console.log(userService.create(user));
        i++;
    })
    .on('end', () => {
        // tslint:disable-next-line:no-console
        console.log('Database successfully populated!!!\nWas inserted ' + i + ' new rows');
    });
  }
}