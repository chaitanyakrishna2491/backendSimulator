import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { DeliveryBoy } from './entities/dBoy.entity';

@Injectable()
export class DeliveryBoysService {
  constructor(
    @InjectRepository(DeliveryBoy)
    private deliveryBoyRepository: Repository<DeliveryBoy>,
  ) {}

  /****************DeliveryBoys CRUD********************/
  findAllDeliveryBoys(): Promise<DeliveryBoy[]> {
    return this.deliveryBoyRepository.find();
  }

  findOneDeliveryBoy(dboy_id: number): Promise<DeliveryBoy> {
    return this.deliveryBoyRepository.findOneBy({ dboy_id });
  }

  createDeliveryBoy(deliveryBoy: DeliveryBoy): Promise<InsertResult> {
    return this.deliveryBoyRepository.insert(deliveryBoy);
  }

  async updatedeliveryBoy(dboy_id: number, deliveryBoy: DeliveryBoy): Promise<UpdateResult> {
    const deliveryBoyList: DeliveryBoy[] = await this.deliveryBoyRepository.findBy({ dboy_id })
    if(deliveryBoyList && deliveryBoyList.length){
      return this.deliveryBoyRepository.update(dboy_id, deliveryBoy);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeDeliveryBoy(id: number): Promise<DeleteResult> {
    return await this.deliveryBoyRepository.delete(id);
  }

}