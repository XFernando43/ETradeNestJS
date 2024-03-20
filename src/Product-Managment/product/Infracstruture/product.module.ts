import { Module } from '@nestjs/common';
import { ProductService } from '../Application/Service/product.service';
import { ProductController } from '../Application/Controller/product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
