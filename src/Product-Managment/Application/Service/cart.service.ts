import { Injectable } from '@nestjs/common';
import { CreateCartDto } from '../../Domain/Dto/cart/create-cart.dto';
import { UpdateCartDto } from '../../Domain/Dto/cart/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/Product-Managment/Domain/Entities/cart.entity';
import { Repository } from 'typeorm';
import { User } from 'src/User-Managment/Domain/Entities/user.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private cartRepository: Repository<Cart>,
              @InjectRepository(User) private UserRepository:Repository<User>) {}


  async findByUser(id: number) {
    const userFinded = await this.UserRepository.findOne({where:{userId:id}});
    const cartDb = await this.cartRepository.findOne({where:{user:userFinded}});
    return cartDb;
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepository.findOne({where:{cartId:id}});
    if (!cart) {
      throw new Error(`Cart with id ${id} not found`);
    }
    this.cartRepository.merge(cart, updateCartDto);
    return await this.cartRepository.save(cart);
  }

  async remove(id: number) {
    const cart = await this.cartRepository.findOne({where:{cartId:id}});
    if (!cart) {
      throw new Error(`Cart with id ${id} not found`);
    }
    await this.cartRepository.remove(cart);
  }
}
