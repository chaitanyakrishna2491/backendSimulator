import { Controller, Get, Param, Post, Put, Delete, Body, Headers } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'userId',
})
@Controller('address')
@ApiBearerAuth()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  /****************Addresss CRUD********************/
  @Get('all')
  getAddressByUser(@Headers('userId') user_id: number): Promise<Address[]> {
    return this.addressService.findAddressByUser(user_id);
  }
  @Get(':id')
  getAddress(@Param('id') address_id: number): Promise<Address> {
    return this.addressService.findOneAddress(address_id);
  }
  @Post('')
  addAddress(@Body() address: Address): Promise<InsertResult> {
    return this.addressService.createAddress(address);
  }
  @Put(':id')
  updateaddress(@Param('id') address_id: number, @Body() address:Address): Promise<UpdateResult> {
    return this.addressService.updateAddress(address_id, address);
  }
  @Delete(':id')
  deleteAddress(@Param('id') address_id: number): Promise<DeleteResult> {
    return this.addressService.removeAddress(address_id);
  }
}
