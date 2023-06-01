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

    
    async cc3(ccid:number,cd:CreditCard ):Promise<any> {
        var rc=await this.CreditCardRepository.findOneBy({"card_Number":cd.card_Number});
        return await this.CreditCardRepository.update(ccid,{...rc,...cd});
    }


    async cc4(@Param() crn:number ): Promise<DeleteResult> {
        return await this.CreditCardRepository.delete(crn);
    }


}
