import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../Domain/Entities/address.entity';
import { AddressController } from '../Application/Controller/address.controller';
import { AddressService } from '../Application/Service/address.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([Address]), 
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
