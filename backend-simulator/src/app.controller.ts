import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto/User.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers(): string {
    return this.appService.getUsers();
  }
  @Get('user/:id')
  getUser(@Param('id') id: string): string {
    return this.appService.getUser(id);
  }
  @Post('user')
  addUser(@Body() user: UserDto): string {
    return this.appService.addUser(user);
  }
  @Put('user/:id')
  updateUser(@Param('id') id: string, @Body() user:UserDto): string {
    return this.appService.updateUser(id, user);
  }
  @Delete('user/:id')
  deleteUser(@Param('id') id: string): string {
    return this.appService.deleteUser(id);
  }
}
