import { Body, Injectable, Param } from '@nestjs/common';
import { Hscreen } from './hscreen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class HscreenService {
    constructor(
        @InjectRepository(Hscreen)
        private HscreenRepository: Repository<Hscreen>,
    ){}
    /*********************************************************** */



    async getHscreens() :Promise<Hscreen[]> {
        return await this.HscreenRepository.find();
    }

    async getHscreensByCatId(cat_id:number):Promise<Hscreen[]> {
        return await this.HscreenRepository.findBy({category_Id:cat_id});
    }

    async getHscreensByProductId(prId:number):Promise<Hscreen[]> {
        return await this.HscreenRepository.findBy({"product_id":prId});
    }

    async addHscreen(@Body() hs:Hscreen) :Promise<InsertResult> {
        return await this.HscreenRepository.insert(hs);
    }

   

    async UpdateHscreen(pid :number,hs:Hscreen) : Promise<any> {
        var existingHScreen=await this.HscreenRepository.findOneBy({"product_id":hs.product_id});
        if(existingHScreen) {
            return this.HscreenRepository.update(pid,{...existingHScreen,...hs});
        }
        else{
                  return new Promise<UpdateResult>((_resolve, reject) => {
                    //  resolve(null)
                  })
                }
    }

   

    async  DeleteHscreen(prId:number):Promise<DeleteResult> {
        return await this.HscreenRepository.delete(prId);
    }




}
