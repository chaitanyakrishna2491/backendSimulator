import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { CreditCard } from './entities/CreditCard.entity';
import { InsertResult } from 'typeorm';

@Controller('credit-card')
export class CreditCardController {
constructor(
    private readonly CreditCardService: CreditCardService 
){}
/*************************************************** */

@Get('credit-cards_byUser_Id/:user_id')
async getProducts(@Param('user_id') user_id:number ): Promise<CreditCard[]> {
  return this.CreditCardService.cc1(user_id);
}
   
@Get('credit-card_by_Id/:id')
async GetCreditCardById(@Param('id') id:string ): Promise<CreditCard> {
  return this.CreditCardService.getCreditCardById(id);
}
    

@Post('credit-card')
async NewCreditCardInsert(@Body() ccr:CreditCard): Promise<InsertResult> {
    return this.CreditCardService.cc2(ccr);
}
@Put('credit-card-update/:ccid')
async UpdateCreditCard(@Param() ccid , @Body() ccr:CreditCard ): Promise<any> {
    return this.CreditCardService.cc3(ccid,ccr);
}
@Delete('delete-credit-card/:idcc')
async DeleteCreditCard(@Param('idcc') idcc:number) : Promise<any> {
    return this.CreditCardService.cc4(idcc);
}

}