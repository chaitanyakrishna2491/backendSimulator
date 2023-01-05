import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { StoresService } from './store.service';
import { Store } from './entities/store.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'userId',
})
@Controller()
@ApiBearerAuth()
export class StoreController {
  constructor(private readonly storeService: StoresService) {}

  /****************Stores CRUD********************/
  @Get('stores')
  getStores(): Promise<Store[]> {
    return this.storeService.findAllStores();
  }
  @Get('store/:id')
  getStore(@Param('id') store_id: number): Promise<Store> {
    return this.storeService.findOneStore(store_id);
  }
  @Post('store')
  addStore(@Body() store: Store): Promise<InsertResult> {
    return this.storeService.createStore(store);
  }
  @Put('store/:id')
  updatestore(@Param('id') store_id: number, @Body() store:Store): Promise<UpdateResult> {
    return this.storeService.updatestore(store_id, store);
  }
  @Delete('store/:id')
  deleteStore(@Param('id') store_id: number): Promise<DeleteResult> {
    return this.storeService.removeStore(store_id);
  }
}
