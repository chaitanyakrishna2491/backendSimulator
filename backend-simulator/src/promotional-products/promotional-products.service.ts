import { Injectable } from '@nestjs/common';
import { PromotionalProduct } from './promotional-products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PromotionalProductsService {
    constructor(
        @InjectRepository(PromotionalProduct)
    private ppc: Repository<PromotionalProduct>,
    ){}
    /************************************************************************************ */
    async m1s() :Promise<PromotionalProduct[]> {
        return await this.ppc.find();
    }
    async m7s(name:string,n?: number, page?: number):Promise<any> {
        var ab=await this.ppc.find();
        var cd=[];
      for(var a of ab) {
          if(a.product_name.toLowerCase().includes(name.toLowerCase())) {
            cd.push(a);
          }
      }
        var v1=[];
        var v2=n||24;
        var v3=(page?((page-1)*v2):0);
        var r=0;let v5=v2;
        while(r<v3){v5++;r++;}
        
        var v4=Math.min(v5,cd.length);
    
        var gh=[];var k=0;
        console.log('startIndex:', v3, 'page:', page, 'pageSize:', v2,'v4==',v4);
    
        for (let i = v3; i <v4; i++) {
         gh[k]=cd[i];
         k++;
        }
    
          return gh;
      }
      
    async m2s(ppid:number) : Promise<PromotionalProduct> {
        return await this.ppc.findOneBy({"product_id":ppid});
    }
    async m5s(pp:PromotionalProduct) : Promise<InsertResult> {
        return await this.ppc.insert(pp);
    }
    async m3s(ppid:number,pp:PromotionalProduct) : Promise<any> {
        var rc=await this.ppc.findOneBy({"product_id":ppid});
        await this.ppc.delete(ppid);
        var ab={...rc,...pp};
        return await this.ppc.insert(ab);
    }
    async m4s(ppid:number):Promise<DeleteResult> {
        return await this.ppc.delete(ppid);
    }
    
}

