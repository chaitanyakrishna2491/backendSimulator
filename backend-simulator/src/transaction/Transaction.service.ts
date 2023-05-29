import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './Transaction.entity';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class TransactionService {

    constructor(
        @InjectRepository(Transaction)
        private TransactionRepository : Repository<Transaction> 
        ) {}
        /************************************ */


        getTns(user_Id:number):Promise<Transaction[]> {

            return this.TransactionRepository.findBy( {user_Id:user_Id} );
            

        }

        insertNewTns(@Body() tsc:Transaction):Promise<InsertResult> {
            return this.TransactionRepository.insert(tsc);
        }

        async updateTns(@Body() tsc:Transaction):Promise<any>{
            var rc=await this.TransactionRepository.findBy({"py_id":tsc.py_id});
            await this.TransactionRepository.delete(tsc.py_id);
            await this.TransactionRepository.insert(tsc);
            return rc;
        }




}
