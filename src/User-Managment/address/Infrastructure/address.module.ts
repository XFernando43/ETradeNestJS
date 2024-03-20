import { Module } from '@nestjs/common';
import { AddressController } from '../Application/Controller/address.controller';
import { AddressService } from '../Application/Service/address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../Domain/entities/address.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Address]), 
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
