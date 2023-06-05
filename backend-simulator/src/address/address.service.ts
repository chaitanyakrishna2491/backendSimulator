import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Address } from './entities/address.entity';
import { Users } from 'src/user/entities/user.entity';
import { Pagination, Search } from 'src/globalHelper';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) {}

  /****************Address CRUD********************/
  findAddressByUser(user_id:number): Promise<Address[]> {
    return this.addressRepository.findBy({ user_id });
  }
 async  qw12(n?: number, page?: number): Promise<any> {
 var urs=await this.userRepository.find();
 var adrses=await this.addressRepository.find();
 //username,address,phonenumber
 var h,j;var yt=[];var yt1;

 for (h of adrses) {
 for (j of urs) {
if(h.user_id==j.id) {
// yt.push({...j,...h});
yt.push({"id":j.id,"name":j.name,"phone":j.user_phone,"address":h});
}
 }
 }
   
    var cd=yt;
    var gh=Pagination(cd,n,page);
    return gh;
  }

  async getAddressBySearch(name:string,n?: number, page?: number):Promise<any> {
    var ab=await this.addressRepository.find();
  return Search(name,ab,n,page);
  }

  findOneAddress(address_id: number): Promise<Address> {
    return this.addressRepository.findOneBy({ address_id });
  }

  createAddress(address: Address): Promise<InsertResult> {
    return this.addressRepository.insert(address);
  }

  async updateAddress(address_id: number, address: Address): Promise<UpdateResult> {
    const existingAddress: Address = await this.addressRepository.findOneBy({ address_id })
    if(address){
      return this.addressRepository.update(address_id, {...existingAddress, ...address, });
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeAddress(address_id: number): Promise<DeleteResult> {
    return await this.addressRepository.delete(address_id);
  }

}