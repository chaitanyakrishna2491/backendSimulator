import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './Transaction.service';
import { Transaction } from './Transaction.entity';
import { InsertResult, UpdateDateColumn } from 'typeorm';

@Controller('Transaction')
export class TransactionController {
    constructor(private readonly TransactionService: TransactionService ) {}

    @Get("Transactions/:user_id") 
    async readTns(@Param('user_id') user_id:number ): Promise<Transaction[]> {
        return this.TransactionService.getTns(user_id);
    }
    @Post("Transaction")
    async insertTns(@Body() tns:Transaction): Promise<InsertResult> {
        return this.TransactionService.insertNewTns(tns);
    }
    @Post("update_transaction")
    async updateTns(@Body() tns:Transaction): Promise<InsertResult> {
        return this.TransactionService.updateTns(tns);
    }
}
