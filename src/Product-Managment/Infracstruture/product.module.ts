import { Module } from '@nestjs/common';
import { ProductService } from '../Application/Service/product.service';
import { ProductController } from '../Application/Controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../Domain/Entities/product.entity';
import { CategoriesService } from '../Application/Service/categories.service';
import { CategoriesModule } from './categories.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product]), 
    CategoriesModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductService]
})
export class ProductModule {}
