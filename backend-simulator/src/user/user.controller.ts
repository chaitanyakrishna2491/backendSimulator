import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { Users } from './entities/user.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { LoginDetail } from './entities/loginDetail.entity';
import { Authentication } from './entities/authentcation.entity';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { PasswordEntity } from './entities/passwordEntity.entity';
import { TwilioNotification } from 'src/utils/TwilioNotificationService';
import { USER_PASSWORD_RESET, USER_SUCCESSFUL_LOGIN } from 'src/constants/constants';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UsersService,
    private readonly twilioNotification: TwilioNotification) {}

  /****************Users CRUD********************/
  @ApiHeader({
    name: 'userId',
  })
  @Get('all')
  getUsers(): Promise<Users[]> {
    return this.userService.findAllUsers();
  }

  @ApiHeader({
    name: 'userId',
  })
  @Get(':id')
  getUser(@Param('id') user_id: number): Promise<Users> {
    return this.userService.findOneUser(user_id);
  }
  
  @Post('authenticate')
  async authenticateUser(@Body() user: LoginDetail): Promise<Authentication> {
    const authResponse: Authentication = await this.userService.authenticateUser(user);
    let userNotification: string = "";
    if(authResponse.authenticated){
      userNotification = USER_SUCCESSFUL_LOGIN.replace('$username', authResponse.retrievedUser.name)
                          .replace('$loginTime', new Date().toString())
                          .replace('$device',authResponse.retrievedUser.device_id)
      console.log(userNotification)
      this.twilioNotification.send(authResponse.retrievedUser.user_phone, userNotification)
    } 
    return authResponse;
  }

  @ApiHeader({
    name: 'userId',
  })
  @Post()
  addUser(@Body() user: Users): Promise<InsertResult> {
    return this.userService.createUser(user);
  }

  @ApiHeader({
    name: 'userId',
  })
  @Put(':id')
  updateUser(@Param('id') user_id: number, @Body() user:Users): Promise<UpdateResult> {
    return this.userService.updateuser(user_id, user, false);
  }

  @ApiHeader({
    name: 'userId',
  })
  @Put(':id/password')
  async updateUserPassword(@Param('id') user_id: number, @Body() password:PasswordEntity): Promise<UpdateResult> {
    const user: Users = await this.userService.findOneUser(user_id);
    const updateResult: UpdateResult = await this.userService.updateuser(user_id, {...user, ...{"password":password.password}}, true);
    if(updateResult.affected){
      const userNotification = USER_PASSWORD_RESET.replace("$username", user.name)
                                .replace("$time", new Date().toString())
      this.twilioNotification.send(user.user_phone, userNotification)
    }
    return updateResult;
  }

  @ApiHeader({
    name: 'userId',
  })
  @Delete(':id')
  deleteUser(@Param('id') user_id: number): Promise<DeleteResult> {
    return this.userService.removeUser(user_id);
  }
}
