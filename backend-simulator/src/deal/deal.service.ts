import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { DealProduct as Deal } from './entities/deal.entity';
import { parse } from 'papaparse';

@Injectable()
export class DealService {
  constructor(
    @InjectRepository(Deal)
    private dealRepository: Repository<Deal>,
  ) {}

  /****************Deals CRUD********************/
  getDeal(): Promise<Deal[]> {
    return this.dealRepository.find();
  }

  findOneDealItem(deal_id: number): Promise<Deal> {
    return this.dealRepository.findOneBy({ deal_id });
  }

  createDealItem(deal_item: Deal): Promise<InsertResult> {
    return this.dealRepository.insert(deal_item);
  }

  async uploadDeals(file: Express.Multer.File): Promise<InsertResult>{
    const csvFile = readFileSync('./files/Deals.csv');
    const deals: Deal[] = await parse(csvFile.toString(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data
    }).data
    return this.dealRepository.insert(deals);
  }

  async updateDealItem(deal_id: number, deal_item: Deal): Promise<UpdateResult> {
    const dealList: Deal[] = await this.dealRepository.findBy({ deal_id })
    if(dealList && dealList.length){
      return this.dealRepository.update(deal_id, deal_item);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeFromDeal(deal_id: number): Promise<DeleteResult> {
    return await this.dealRepository.delete(deal_id);
  }
}