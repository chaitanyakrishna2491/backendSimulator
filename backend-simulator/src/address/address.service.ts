import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Address } from './entities/address.entity';
import { Users } from 'src/user/entities/user.entity';

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
 async  qw12(): Promise<any> {
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
    return yt  ;
  }

  findOneAddress(address_id: number): Promise<Address> {
    return this.addressRepository.findOneBy({ address_id });
  }

  createAddress(address: Address): Promise<InsertResult> {
    return this.addressRepository.insert(address);
  }

  async updateAddress(address_id: number, address: Address): Promise<UpdateResult> {
    const addressList: Address[] = await this.addressRepository.findBy({ address_id })
    if(addressList && addressList.length){
      return this.addressRepository.update(address_id, address);
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