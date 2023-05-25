import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionService } from './Transaction.service';
import { Transaction } from './Transaction.entity';
import { InsertResult, UpdateDateColumn } from 'typeorm';

@Controller('Transaction')
export class TransactionController {
    constructor(private readonly TransactionService: TransactionService ) {}

    @Get("Transactions") 
    async readTns(): Promise<Transaction[]> {
        return this.TransactionService.getTns();
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
