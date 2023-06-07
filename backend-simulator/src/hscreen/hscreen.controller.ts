import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HscreenService } from './hscreen.service';
import { Hscreen } from './hscreen.entity';
import { DeleteResult, InsertResult } from 'typeorm';

@Controller('hscreen')
export class HscreenController {
    constructor( private readonly HscreenService:HscreenService) {}
    /******************************************************* */
    @Get('AllHscreens')
    async getAllHscreens():Promise<any> {
        return this.HscreenService.getHscreens();
    }

    @Get('ByCatId/:HSCategory')
    async getAllHscreensByCatId(@Param('HSCategory') cat_id:number,@Query('items_per_page') n?: number,@Query('page_number') pgn?: number):Promise<any> {
        return this.HscreenService.getHscreensByCatId(cat_id,n,pgn);
    }

    @Get('HscreensByProduct_Id/:product_id')
    async getAllHscreensByProductId(@Param('product_id') prId:number,@Query('items_per_page') n?: number,@Query('page_number') pgn?: number):Promise<any> {
        return this.HscreenService.getHscreensByProductId(prId,n,pgn);
    }
    
    @Get('HScreen__Search/:keyword')
    m2(@Param('keyword') name:string , @Query('items_per_page') n?: number,@Query('page_number') pgn?: number):Promise<any> {
      return this.HscreenService.m2s(name,n,pgn);
    }

    @Post('AddHscreen')
    async insertHscreen(@Body() hs:Hscreen) :Promise<InsertResult> {
        return this.HscreenService.addHscreen(hs);
    }

    @Post('UpdateHscreenById/:hs_id')
    async updateHscreen(@Param('hs_id') hs_id,@Body() hs:Hscreen) :Promise<any> {
        return this.HscreenService.UpdateHscreen(hs_id,hs);
    }
    @Post('DeleteHscreen/:pr_id')
    async deleteHscreen(@Param('pr_id') pr_id:number ) :Promise<DeleteResult> {
        return this.HscreenService.DeleteHscreen(pr_id);
    }
    
}
