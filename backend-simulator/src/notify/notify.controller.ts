import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { Notify } from './notify.entity';
import { InsertResult } from 'typeorm';

@Controller('notify')
export class NotifyController {
    constructor(private readonly notifyService:NotifyService){}

    /********************************* */
    @Get('notifications')
     async getNfs( @Query('items_per_page') n?: number,@Query('page_number') pgn?: number):Promise<any> {
        return await this.notifyService.getNfcs(n,pgn);
    }

    @Get('notificationById/:id')
    async getNfnsById(@Param('id') id:number):Promise<Notify> {
        return await this.notifyService.getNfsById(id);
    }

    @Get('notification__Search/:keyword')
    m2(@Param('keyword') name:string , @Query('items_per_page') n?: number,@Query('page_number') pgn?: number):Promise<any> {
      return this.notifyService.m2s(name,n,pgn);
    }

    @Get('notificationsByUserId/:uid')
    async getnfsByUser(@Param('uid') uid:number):Promise<Notify[]> {
        return await this.notifyService.getNfsByUserId(uid);
    }


    @Post()
    async addNewNotification(@Body() nf:Notify):Promise<InsertResult> {
            return await this.notifyService.addNfs(nf);
    }
    @Post('updateNotificationById/:id')
    async updateNfns(@Param('id') nf_id,@Body() nf:Notify): Promise<any> {
        return await this.notifyService.updateNfs(nf_id,nf);
    }
    

}
