import { Controller, Get, Param, Post, Put, Delete, Body, FileTypeValidator, ParseFilePipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealProduct as Deal } from './entities/deal.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'userId',
})
@Controller()
@ApiBearerAuth()
export class DealController {
  constructor(private readonly dealService: DealService) {}

  /****************Deal CRUD********************/
  @Get('deals')
  getDeal(): Promise<Deal[]> {
    return this.dealService.getDeal();
  }
  @Get('deal/:id')
  getDealItem(@Param('id') deal_id: number): Promise<Deal> {
    return this.dealService.findOneDealItem(deal_id);
  }
  @Post('deal')
  addToDeal(@Body() deal: Deal): Promise<InsertResult> {
    return this.dealService.createDealItem(deal);
  }
  @Post('deals/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: function (req, file, cb) {
        cb(null , 'Deals.csv');
      }
    })
  }))
  async uploadProducts(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'csv' }),
      ],
    }),
  ) file: Express.Multer.File): Promise<InsertResult> {
    return this.dealService.uploadDeals(file);
  }
  @Put('deal/:id')
  updateDeal(@Param('id') deal_id: number, @Body() deal:Deal): Promise<UpdateResult> {
    return this.dealService.updateDealItem(deal_id, deal);
  }
  @Delete('deal/:id')
  deleteDeal(@Param('id') deal_id: number): Promise<DeleteResult> {
    return this.dealService.removeFromDeal(deal_id);
  }
}
