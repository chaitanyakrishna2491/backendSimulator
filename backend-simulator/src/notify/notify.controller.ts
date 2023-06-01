import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { Notify } from './notify.entity';
import { InsertResult } from 'typeorm';

@Controller('notify')
export class NotifyController {
    constructor(private readonly notifyService:NotifyService){}

    /********************************* */
    @Get('notifications')
     async getNfs():Promise<Notify[]> {
        return await this.notifyService.getNfcs();
    }

    @Get('notificationById/:id')
    async getNfnsById(@Param('id') id:number):Promise<Notify> {
        return await this.notifyService.getNfsById(id);
    }

    @Get('notificationsByUserId/:uid')
    async getnfsByUser(@Param('uid') uid:number):Promise<Notify[]> {
        return await this.notifyService.getNfsByUserId(uid);
    }


    @Post()
    async addNewNotification(@Body() nf:Notify):Promise<InsertResult> {
            return await this.notifyService.addNfs(nf);
    }
    @Post('updateNotificationById')
    async updateNfns(@Param() nf_id,@Body() nf:Notify): Promise<any> {
        return await this.notifyService.updateNfs(nf_id,nf);
    }
    

}
