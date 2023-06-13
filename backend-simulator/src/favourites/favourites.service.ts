import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/products.entity';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { Favourites } from './entities/Favourites.entity';
import { Pagination } from 'src/globalHelper';

@Injectable()
export class FavouritesService {

    
  constructor(

    @InjectRepository(Favourites)
    private FavouritesRepository: Repository<Favourites>,

    

    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
   
  ) {}

  async getAllFav(user_id:number): Promise<any> {
    return await this.FavouritesRepository.findBy({user_id:user_id});
   
  }

  async getFavProducts(user_id:number): Promise<any> {
    var ab=await this.FavouritesRepository.findBy({user_id:user_id});
    var cd=[]; 
    for(var a of ab) {
      var ef=await this.productsRepository.findOneBy({"product_id":a.prod_id});
      cd.push({"Fav":a,"product":ef});
    }
   return cd;
  }
  


  
  createFav(fav:Favourites): Promise<InsertResult> {
    return this.FavouritesRepository.insert(fav);
  }

  async delfav(uid:number,prod_id:number): Promise<DeleteResult> { 
       const resp = await this.FavouritesRepository.delete({
          user_id: uid,
          prod_id: prod_id
       });
       return this.getFavProducts(uid);
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
