import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  /****************Stores CRUD********************/
  findAllStores(): Promise<Store[]> {
    return this.storeRepository.find();
  }

  findOneStore(id: number): Promise<Store> {
    return this.storeRepository.findOneBy({ id });
  }

  createStore(store: Store): Promise<InsertResult> {
    return this.storeRepository.insert(store);
  }

  async updatestore(id: number, store: Store): Promise<UpdateResult> {
    const storeList: Store[] = await this.storeRepository.findBy({ id })
    if(storeList && storeList.length){
      return this.storeRepository.update(id, store);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeStore(id: number): Promise<DeleteResult> {
    return await this.storeRepository.delete(id);
  }

}