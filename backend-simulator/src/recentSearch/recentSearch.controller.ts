import { Controller, Get, Param, Post, Put, Delete, Body, FileTypeValidator, ParseFilePipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RecentSearchService } from './recentSearch.service';
import { RecentSearch } from './entities/recentSearch.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'userId',
})
@Controller()
@ApiBearerAuth()
export class RecentSearchController {
  constructor(private readonly recentSearchService: RecentSearchService) {}

  /****************RecentSearch CRUD********************/
  @Get('recentSearchs')
  getRecentSearch(): Promise<RecentSearch[]> {
    return this.recentSearchService.getRecentSearch();
  }
  @Get('recentSearch/:id')
  getRecentSearchItem(@Param('id') recentSearch_id: number): Promise<RecentSearch> {
    return this.recentSearchService.findOneRecentSearchItem(recentSearch_id);
  }
  @Post('recentSearch')
  addToRecentSearch(@Body() recentSearch: RecentSearch): Promise<InsertResult> {
    return this.recentSearchService.createRecentSearchItem(recentSearch);
  }
  @Put('recentSearch/:id')
  updateRecentSearch(@Param('id') recentSearch_id: number, @Body() recentSearch:RecentSearch): Promise<UpdateResult> {
    return this.recentSearchService.updateRecentSearchItem(recentSearch_id, recentSearch);
  }
  @Delete('recentSearch/:id')
  deleteRecentSearch(@Param('id') recentSearch_id: number): Promise<DeleteResult> {
    return this.recentSearchService.removeFromRecentSearch(recentSearch_id);
  }
}
