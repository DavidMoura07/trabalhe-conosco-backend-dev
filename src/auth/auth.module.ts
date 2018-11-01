import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpStrategy } from './http.strategy';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, HttpStrategy, UsersService],
})
export class AuthModule {}
