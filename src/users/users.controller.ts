import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id) {
    return this.userService.findOne(id);
  }

  @Get('/search/:keyword/:pag')
  @UseGuards(AuthGuard('bearer'))
  search(@Param() params) {
    return this.userService.search(params.keyword, params.pag);
  }

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Put()
  update(@Body() user: CreateUserDto) {
    return this.userService.update(user);
  }

  @Delete()
  delete(@Body('id') id) {
    return this.userService.delete(id);
  }
}
