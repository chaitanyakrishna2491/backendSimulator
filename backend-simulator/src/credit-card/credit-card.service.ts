import { Body, Get, Injectable, Param } from '@nestjs/common';
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
        return await this.CreditCardRepository.findBy({user_Id});
    }

    async cc2(@Body() cd:CreditCard):Promise<InsertResult> {
        return await this.CreditCardRepository.insert(cd);
    }
    async cc3(@Body() cd:CreditCard ):Promise<any> {
        var rc=await this.CreditCardRepository.findBy({"card_Number":cd.card_Number});
        await this.CreditCardRepository.delete(cd.card_Number);
        await this.CreditCardRepository.insert(cd);
       return rc;
    }
    async cc4(@Param() crn:number ): Promise<DeleteResult> {
        return await this.CreditCardRepository.delete(crn);
    }


}
