import { Module } from '@nestjs/common';
import { ProductService } from '../Application/Service/product.service';
import { ProductController } from '../Application/Controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../Domain/entities/product.entity';
import { Category } from 'src/Product-Managment/categories/Domain/entities/category.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product,Category]), 
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
