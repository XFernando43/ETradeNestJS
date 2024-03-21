import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from '../address/Domain/entities/address.entity';
import { Repository } from 'typeorm';
import { retry } from 'rxjs';

@Injectable()
export class EmailService {

  constructor(@InjectRepository(Address) private readonly AddressRepository:Repository<Address>){}

  async create(createEmailDto: any) {
    try{
      const newEmail = await this.AddressRepository.create(createEmailDto);
      return this.AddressRepository.save(newEmail);
    }catch(error){
      throw new HttpException(error,HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    try{
      return await this.AddressRepository.find();
    }catch(Error){
      throw new Error
    }
  }

  async findOne(id: number) {
    try{
      return await this.AddressRepository.findOne({
        where:{
          addressId:id
        }
      })
    }catch(error){

    }
  }

  async update(id: number, updateEmailDto: any) {
    try{
      if (id === 0) {
        return 'product no econtrado';
      } else {
        return await this.AddressRepository.update(id, updateEmailDto);
      }
    }catch(error){
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
