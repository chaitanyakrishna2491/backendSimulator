import { Controller, Get, Param, Post, Put, Delete, Body, Headers } from '@nestjs/common';
import { RecentSearchService } from './recentSearch.service';
import { RecentSearch } from './entities/recentSearch.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'userId',
})
@Controller('recentSearch')
@ApiBearerAuth()
export class RecentSearchController {
  constructor(private readonly recentSearchService: RecentSearchService) {}

  /****************RecentSearch CRUD********************/
  @Get('all')
  getRecentSearch(@Headers('userId') user_id: number): Promise<RecentSearch[]> {
    return this.recentSearchService.getRecentSearch(user_id);
  }
  @Get(':id')
  getRecentSearchItem(@Param('id') recentSearch_id: number): Promise<RecentSearch> {
    return this.recentSearchService.findOneRecentSearchItem(recentSearch_id);
  }
  @Post()
  addToRecentSearch(@Body() recentSearch: RecentSearch): Promise<InsertResult> {
    return this.recentSearchService.createRecentSearchItem(recentSearch);
  }
  @Put(':id')
  updateRecentSearch(@Param('id') recentSearch_id: number, @Body() recentSearch:RecentSearch): Promise<UpdateResult> {
    return this.recentSearchService.updateRecentSearchItem(recentSearch_id, recentSearch);
  }
  @Delete(':id')
  deleteRecentSearch(@Param('id') recentSearch_id: number): Promise<DeleteResult> {
    return this.recentSearchService.removeFromRecentSearch(recentSearch_id);
  }
}
