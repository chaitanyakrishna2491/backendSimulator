import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { Users } from './entities/user.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  /****************Users CRUD********************/
  @Get()
  getUsers(): Promise<Users[]> {
    return this.userService.findAllUsers();
  }
  @Get('user/:id')
  getUser(@Param('id') user_id: number): Promise<Users> {
    return this.userService.findOneUser(user_id);
  }
  @Post('user')
  addUser(@Body() user: Users): Promise<InsertResult> {
    return this.userService.createUser(user);
  }
  @Put('user/:id')
  updateuser(@Param('id') user_id: number, @Body() user:Users): Promise<UpdateResult> {
    return this.userService.updateuser(user_id, user);
  }
  @Delete('user/:id')
  deleteUser(@Param('id') user_id: number): Promise<DeleteResult> {
    return this.userService.removeUser(user_id);
  }
}
