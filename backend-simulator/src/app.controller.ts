import { Body, Controller, Post } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { AppService } from './app.service';

@Controller('')
export class AppController {
    constructor(private readonly appService: AppService) {}

    // @Post('gUser/create')  
    // createGoogleUser(@Body() token: String): Promise<InsertResult>{
    //     return this.appService.createGoogleUser(token)
    // }
}
