import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Store } from './entities/store.entity';
import { Pagination } from 'src/globalHelper';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  /****************Stores CRUD********************/
  async findAllStores(n?: number, page?: number): Promise<any> {
    var cd=await this.storeRepository.find();
   var gh=Pagination(cd,n,page); return gh;
  }

  
async m7s(name:string,n?: number, page?: number):Promise<any> {
  var ab=await this.storeRepository.find();
  var cd=[];
for(var a of ab) {
    if(a.store_name.toLowerCase().includes(name.toLowerCase())) {
      cd.push(a);
    }
}
 var gh=Pagination(cd,n,page);return gh;
}

  findOneStore(id: number): Promise<Store> {
    return this.storeRepository.findOneBy({ id });
  }

  createStore(store: Store): Promise<InsertResult> {
    return this.storeRepository.insert(store);
  }

  // async updatestore(id: number, store: Store): Promise<UpdateResult> {
  //   const storeList: Store[] = await this.storeRepository.findBy({ id })
  //   if(storeList && storeList.length){
  //     return this.storeRepository.update(id, store);
  //   }else{
  //     return new Promise<UpdateResult>((resolve, reject) => {
  //       //  resolve(null)
  //     })
  //   }
  // }

  async updatestore(id: number, store: Store): Promise<UpdateResult> {
    const rc= await this.storeRepository.findOneBy({ id });
    if(rc){
      return this.storeRepository.update(id, {...rc,...store});
    } else {
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeStore(id: number): Promise<DeleteResult> {
    return await this.storeRepository.delete(id);
  }

}