import { Module } from '@nestjs/common';
import { CartService } from '../Application/Service/cart.service';
import { CartController } from '../Application/Controller/cart.controller';

@Module({
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
