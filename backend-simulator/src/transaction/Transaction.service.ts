import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './Transaction.entity';
import { InsertResult, Repository, UpdateResult } from 'typeorm';

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

        async updateTns(py_id:number, tsc:Transaction):Promise<any>{
            var rc=await this.TransactionRepository.findOneBy({"py_id":tsc.py_id});
            if(rc) {
                return this.TransactionRepository.update(py_id,{...rc,...tsc});
            }
            else{
                      return new Promise<UpdateResult>((_resolve, reject) => {
                        //  resolve(null)
                      })
                    }
                }

       
}
