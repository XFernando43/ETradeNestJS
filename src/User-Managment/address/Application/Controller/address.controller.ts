import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressService } from '../Service/address.service';
import { CreateAddressDto } from '../../Domain/dto/create-address.dto';
import { ApiTags } from '@nestjs/swagger';


@Controller('address')
@ApiTags("Addres")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // @Post()
  // create(@Body() createAddressDto: CreateAddressDto) {
  //   return this.addressService.create(createAddressDto);
  // }

  // @Get()
  // findAll() {
  //   return this.addressService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.addressService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
  //   return this.addressService.update(+id, updateAddressDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.addressService.remove(+id);
  // }
}
