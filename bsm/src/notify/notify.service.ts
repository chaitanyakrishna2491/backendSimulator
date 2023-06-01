import { Body, Get, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
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
    async getNfsByUserId(uid:number):Promise<Notify[]> {
        return await this.notifyRepository.findBy({user_id:uid});
    }

    async addNfs(@Body() nf:Notify):Promise<InsertResult> {
        return await this.notifyRepository.insert(nf); 
    }

    async updateNfs(nf_id:number, nf:Notify ) :Promise<any> {
       var existingNf=await this.notifyRepository.findOneBy({notify_id:nf_id});
       if(existingNf){
              return this.notifyRepository.update(nf_id, {...existingNf,...nf});
            }else{
              return new Promise<UpdateResult>((_resolve, reject) => {
                //  resolve(null)
              })
            }
    }

     
    
     
    

}
