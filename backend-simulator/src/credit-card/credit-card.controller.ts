import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { CreditCard } from './entities/CreditCard.entity';
import { InsertResult } from 'typeorm';

@Controller('credit-card')
export class CreditCardController {
constructor(
    private readonly CreditCardService: CreditCardService 
){}
/*************************************************** */

@Get('credit-cards')
async getProducts(): Promise<CreditCard[]> {
  return this.CreditCardService.cc1();
}

@Post('credit-card')
async NewCreditCardInsert(@Body() ccr:CreditCard): Promise<InsertResult> {
    return this.CreditCardService.cc2(ccr);
}
@Post('credit-card-update')
async UpdateCreditCard(@Body() ccr:CreditCard ): Promise<any> {
    return this.CreditCardService.cc3(ccr);
}
@Post('delete-credit-card/:idcc')
async DeleteCreditCard(@Param('idcc') idcc:number) : Promise<any> {
    return this.CreditCardService.cc4(idcc);
}

}
