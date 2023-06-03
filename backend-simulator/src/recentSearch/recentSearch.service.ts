import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { RecentSearch } from './entities/recentSearch.entity';
import { parse } from 'papaparse';

@Injectable()
export class RecentSearchService {
  constructor(
    @InjectRepository(RecentSearch)
    private recentSearchRepository: Repository<RecentSearch>,
  ) {}

  /****************RecentSearchs CRUD********************/
 async  getRecentSearch(user_id: number): Promise<RecentSearch[]> {
    var ab=await this.recentSearchRepository.findBy({user_id});
    var ar=[];
 
    for(let i=ab.length-1;i>ab.length-7;i--) {
      ar.push(ab[i]);
    }
    return ar;
  }

  findOneRecentSearchItem(id: number): Promise<RecentSearch> {
    return this.recentSearchRepository.findOneBy({ id });
  }

  createRecentSearchItem(recentSearch_item: RecentSearch): Promise<InsertResult> {
    return this.recentSearchRepository.insert(recentSearch_item);
  }

  // async updateRecentSearchItem(id: number, recentSearch_item: RecentSearch): Promise<UpdateResult> {
  //   const recentSearchList: RecentSearch[] = await this.recentSearchRepository.findBy({ id })
  //   if(recentSearchList && recentSearchList.length){
  //     return this.recentSearchRepository.update(id, recentSearch_item);
  //   }else{
  //     return new Promise<UpdateResult>((resolve, reject) => {
  //       //  resolve(null)
  //     })
  //   }
  // }

  async updateRecentSearchItem(id: number, recentSearch_item: RecentSearch): Promise<UpdateResult> {
    const rc= await this.recentSearchRepository.findOneBy({ id })
    if(rc){
      return this.recentSearchRepository.update(id, {...rc,...recentSearch_item});
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }




  async removeFromRecentSearch(recentSearch_id: number): Promise<DeleteResult> {
    return await this.recentSearchRepository.delete(recentSearch_id);
  }

  async delS():Promise<any> {
    var ab=await this.recentSearchRepository.find();
    for(var a of ab) {
      await this.recentSearchRepository.delete(a.id);
    }
    return [];

  }


}