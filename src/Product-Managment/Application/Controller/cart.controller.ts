import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from '../Service/cart.service';
import { CreateCartDto } from '../../Domain/Dto/cart/create-cart.dto';
import { UpdateCartDto } from '../../Domain/Dto/cart/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('cart')
@ApiTags('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}


  @Get(':id')
  findByUser(@Param('id') id: string) {
    return this.cartService.findByUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
