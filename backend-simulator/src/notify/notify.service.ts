import { Body, Get, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Notify } from './notify.entity';
import { get } from 'http';

@Injectable()
export class NotifyService {

    constructor(
    @InjectRepository(Notify)
    private notifyRepository:Repository<Notify> 
    ) {}

    /*************************** */
    async getNfcs():Promise<Notify[]> {
            return await this.notifyRepository.find();
    }

    //async getNfsByUserId:Promise<Notify>

    async getNfsById(id:number):Promise<Notify> {
        return await this.notifyRepository.findOneBy({ "notify_id" :id});
    }

    async addNfs(@Body() nf:Notify):Promise<InsertResult> {
        return await this.notifyRepository.insert(nf); 
    }

    async updateNfs(@Body() nf:Notify ) :Promise<any> {
        var rc=await this.notifyRepository.findBy({"notify_id":nf.notify_id});
        await this.notifyRepository.delete(nf.notify_id);
        await this.notifyRepository.insert(nf);
       return rc;
    }
    
     
    

}
