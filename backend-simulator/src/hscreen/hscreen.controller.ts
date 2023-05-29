import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HscreenService } from './hscreen.service';
import { Hscreen } from './hscreen.entity';
import { DeleteResult, InsertResult } from 'typeorm';

@Controller('hscreen')
export class HscreenController {
    constructor( private readonly HscreenService:HscreenService) {}
    /******************************************************* */
    @Get('AllHscreens')
    async getAllHscreens():Promise<Hscreen[]> {
        return this.HscreenService.getHscreens();
    }

    @Get('ByCatId/:HSCategory')
    async getAllHscreensByCatId(@Param('HSCategory') cat_id:number):Promise<Hscreen[]> {
        return this.HscreenService.getHscreensByCatId(cat_id);
    }
    @Get('ByProduct_Id/:product_id')
    async getAllHscreensByProductId(@Param('product_id') prId:number):Promise<Hscreen[]> {
        return this.HscreenService.getHscreensByProductId(prId);
    }

    @Post('AddHscreen')
    async insertHscreen(@Body() hs:Hscreen) :Promise<InsertResult> {
        return this.HscreenService.addHscreen(hs);
    }

    @Post('UpdateHscreen')
    async updateHscreen(@Body() hs:Hscreen) :Promise<any> {
        return this.HscreenService.UpdateHscreen(hs);
    }
    @Post('DeleteHscreen/:pr_id')
    async deleteHscreen(@Param('pr_id') pr_id:number ) :Promise<DeleteResult> {
        return this.HscreenService.DeleteHscreen(pr_id);
    }
    
}
