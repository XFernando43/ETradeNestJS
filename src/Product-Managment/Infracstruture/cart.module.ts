import { Module } from '@nestjs/common';
import { CartService } from '../Application/Service/cart.service';
import { CartController } from '../Application/Controller/cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../Domain/Entities/cart.entity';
import { User } from 'src/User-Managment/Domain/Entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cart,User])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
