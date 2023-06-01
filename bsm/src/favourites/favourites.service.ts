import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/products.entity';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { Favourites } from './entities/Favourites.entity';

@Injectable()
export class FavouritesService {

    
  constructor(

    @InjectRepository(Favourites)
    private FavouritesRepository: Repository<Favourites>,

    

    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
   
  ) {}

  async getAllFav(user_id:number): Promise<any> {
    return this.FavouritesRepository.findBy({user_id:user_id});
  }

  
  createFav(fav:Favourites): Promise<InsertResult> {
    return this.FavouritesRepository.insert(fav);
  }

  async delfav(uid:number,prod_id:number): Promise<DeleteResult> { 
       var  q1=await this.FavouritesRepository.find();
        for(var h of q1) {
          if(h.user_id==uid &&  h.prod_id==prod_id) {
                return (  await this.FavouritesRepository.delete(h.fav_id) );
          }
        }

  }


  async fpb(u_Id:number): Promise<any> {

    var q2=await this.productsRepository.find();
    var q1=await this.FavouritesRepository.find();
    var prp=[];

    for(var h of q1)
      {
        for(var j of q2) {
          if(h.user_id==u_Id && j.product_id==h.prod_id) {
            prp.push(j);
          }
        }
      }

    return prp;
  }

  







}
