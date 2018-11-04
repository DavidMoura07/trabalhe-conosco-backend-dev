import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitys/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.register({
      ttl: 60, // seconds
      max: 15, // maximum number of items in cache
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
