import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PopulateDb } from 'database/populate-db';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: CreateUserDto){
    return this.userService.create(user);
  }

  @Put()
  update(@Body() user: CreateUserDto){
    return this.userService.update(user);
  }

  @Delete()
  delete(@Body('id') id){
    console.log('CONTROLLER: ' + id);
    return this.userService.delete(id);
  }

  @Patch()
  populateDb(){
    return this.userService.PopulatefromFile('users_10.csv');
  }
}
