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
  CacheInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiImplicitParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('users')
@UseInterceptors(CacheInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({
    title: 'Find User by ID',
    description: 'Find one user by ID, you need to pass it in this route',
  })
  @ApiImplicitParam({
    name: 'id',
    description: 'ID of User that you want find',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'User', type: CreateUserDto })
  @ApiResponse({ status: 204, description: 'User not found' })
  @Get(':id')
  findOne(@Param('id') id) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    title: 'Search',
    description:
      'Search users based on a keyword. Return result with pagination of 15 elements. Needs authentication <Bearer TOKEN>',
  })
  @ApiImplicitParam({
    name: 'keyword',
    description: 'Can be a name or a username, or part of it.',
    required: true,
  })
  @ApiImplicitParam({
    name: 'pag',
    description: 'page that you want. Needs to be a number gratter than zero',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Users list ordened by priority' })
  @ApiResponse({ status: 204, description: 'Users list empty' })
  @Get('/search/:keyword/:pag')
  search(@Param() params) {
    return this.userService.search(params.keyword, params.pag);
  }

  @ApiOperation({
    title: 'Create a new user',
    description:
      'create a new user acording to the model CreateUserDto. Needs authorization Bearer',
  })
  @ApiResponse({ status: 200, description: 'User' })
  @ApiResponse({ status: 204, description: 'User Can\'t be created' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('bearer'))
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @ApiOperation({
    title: 'Update a user',
    description:
      'Update a user acording to the model CreateUserDto. Needs authorization Bearer',
  })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 204, description: 'User Can\'t be updated' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('bearer'))
  @Put()
  update(@Body() user: CreateUserDto) {
    return this.userService.update(user);
  }

  @ApiOperation({
    title: 'Delete a user',
    description:
      'Deletes a user according to his ID. Needs authorization Bearer',
  })
  @ApiImplicitParam({
    name: 'id',
    description: 'ID of user that you want delete',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiResponse({ status: 204, description: 'User Can\'t be deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('bearer'))
  @Delete()
  delete(@Param('id') id) {
    return this.userService.delete(id);
  }
}
