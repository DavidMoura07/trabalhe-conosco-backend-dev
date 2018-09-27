import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from 'users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const userService = new UsersService();
  await app.listen(3000);
  // UsersService.fromFile('users_10.csv');
}
bootstrap();
