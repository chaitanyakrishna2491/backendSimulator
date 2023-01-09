import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { Users } from './entities/user.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Password } from './entities/password.entity';
import { Authentication } from './entities/authentcation.entity';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller()
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UsersService) {}

  /****************Users CRUD********************/
  @ApiHeader({
    name: 'userId',
  })
  @Get('users')
  getUsers(): Promise<Users[]> {
    return this.userService.findAllUsers();
  }

  @ApiHeader({
    name: 'userId',
  })
  @Get('user/:id')
  getUser(@Param('id') user_id: number): Promise<Users> {
    return this.userService.findOneUser(user_id);
  }
  
  @Post('authenticateUser')
  authentcateUser(@Body() user: Password): Promise<Authentication> {
    return this.userService.authenticateUser(user);
  }

  @ApiHeader({
    name: 'userId',
  })
  @Post('user')
  addUser(@Body() user: Users): Promise<InsertResult> {
    return this.userService.createUser(user);
  }

  @ApiHeader({
    name: 'userId',
  })
  @Put('user/:id')
  updateuser(@Param('id') user_id: number, @Body() user:Users): Promise<UpdateResult> {
    return this.userService.updateuser(user_id, user);
  }

  @ApiHeader({
    name: 'userId',
  })
  @Delete('user/:id')
  deleteUser(@Param('id') user_id: number): Promise<DeleteResult> {
    return this.userService.removeUser(user_id);
  }
}
