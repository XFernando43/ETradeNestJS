import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../../Domain/dto/create-address.dto';
import { UpdateAddressDto } from '../../Domain/dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../../Domain/entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {

  constructor(@InjectRepository(Address) addressRepository:Repository<Address>){}

  // create(createAddressDto: CreateAddressDto) {
  //   return 'This action adds a new address';
  // }

  // findAll() {
  //   return `This action returns all address`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} address`;
  // }

  // update(id: number, updateAddressDto: UpdateAddressDto) {
  //   return `This action updates a #${id} address`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} address`;
  // }
}
