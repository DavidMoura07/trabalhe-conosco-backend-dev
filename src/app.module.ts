import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

// const configDb = {
//   type: process.env.DB_TYPE || 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT, 10) || 5432,
//   username: process.env.DB_USER || 'picpay',
//   password: process.env.DB_PASSWORD || 'picpay',
//   database: process.env.DB_SCHEMA || 'picpay',
//   entities: ['src/**/**.entity{.ts,.js}'],
//   synchronize: process.env.DB_ORM_SYNC || false,
// };

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
