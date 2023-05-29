import { Body, Injectable } from '@nestjs/common';
import { Hscreen } from './hscreen.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository } from 'typeorm';

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

    async UpdateHscreen(@Body() hs:Hscreen) : Promise<any> {
        var rc=await this.HscreenRepository.findBy({"product_id":hs.product_id});
        await this.HscreenRepository.delete(hs.product_id);
        await this.HscreenRepository.insert(hs);
         return rc;
    }

    async  DeleteHscreen(prId:number):Promise<DeleteResult> {
        return await this.HscreenRepository.delete(prId);
    }




}
