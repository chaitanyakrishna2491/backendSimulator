import { Controller, Get, Param, Post, Put, Delete, Body, Headers } from '@nestjs/common';
import { UsersService } from './user.service';
import { Users } from './entities/user.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { LoginDetail } from './entities/loginDetail.entity';
import { Authentication } from './entities/authentcation.entity';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { PasswordEntity } from './entities/passwordEntity.entity';
import { SMSNotification } from 'src/sms/SMSNotification.service';
import { USER_PASSWORD_RESET, USER_SUCCESSFUL_LOGIN, USER_SUCCESSFUL_LOGOUT } from 'src/constants/constants';
import { MailService } from 'src/mail/mail.service';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UsersService,
    private readonly twilioNotification: SMSNotification,
    private readonly mailService: MailService) {}

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
      // this.twilioNotification.send(authResponse.retrievedUser.user_phone, userNotification)
      // this.mailService.sendMail(authResponse.retrievedUser.email, authResponse.retrievedUser.name, "successfullogin", "Login Confirmation")
    } 
    return authResponse;
  }

  @ApiHeader({
    name: 'userId', 
  })
  @Post('logout')
  async logoutUser(@Headers("userId") userID: number): Promise<Authentication> {
    const authResponse: Authentication = await this.userService.logoutUser(userID);
    let userNotification: string = "";
    if(authResponse.authenticated){
      userNotification = USER_SUCCESSFUL_LOGOUT.replace('$username', authResponse.retrievedUser.name)
                          .replace('$loginTime', new Date().toString())
      console.log(userNotification)
      // this.twilioNotification.send(authResponse.retrievedUser.user_phone, userNotification)
      this.mailService.sendMail(authResponse.retrievedUser.email, authResponse.retrievedUser.name, "successfullogout", "Logout Confirmation")
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
  @Put()
  updateUser(@Body() user:Users): Promise<UpdateResult> {
    return this.userService.updateuser(user.id, user, false);
  }

  @ApiHeader({
    name: 'userId',
  })
  @Put('password')
  async updateUserPassword(@Headers("userid") user_id: number, @Body() password:PasswordEntity): Promise<UpdateResult> {
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
  @Delete()
  deleteUser(@Headers("userid") user_id: number): Promise<DeleteResult> {
    return this.userService.removeUser(user_id);
  }
}
