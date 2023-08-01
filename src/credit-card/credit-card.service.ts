import { Body, Get, Headers, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditCard } from './entities/CreditCard.entity';
import { DeleteResult, InsertResult, Repository } from 'typeorm';

@Injectable()
export class CreditCardService {

    constructor (
        @InjectRepository (CreditCard) 
        private CreditCardRepository:Repository<CreditCard> 
    ) {}

    /************************************************ */
    
    async cc1(user_Id:number):Promise<CreditCard[]> {
        return await this.CreditCardRepository.findBy({"user_Id":user_Id});
    }


    async getCreditCardById(id:string):Promise<CreditCard> {
        return await this.CreditCardRepository.findOneBy({"id":id});
    }

 

    async cc2(cd:CreditCard):Promise<InsertResult> {
        return await this.CreditCardRepository.insert(cd);
    }

    
    async cc3(card_Number:number,cd:CreditCard ):Promise<any> {
        var rc=await this.CreditCardRepository.findOneBy({"id":cd.id});
        return await this.CreditCardRepository.update(card_Number,{...rc,...cd});
    }


    async cc4(crn:string, user_Id: number): Promise<any> {
        await this.CreditCardRepository.delete({"card_Number":crn});
        console.log("successfullly deleted")
        return await this.cc1(user_Id)
    }


}
