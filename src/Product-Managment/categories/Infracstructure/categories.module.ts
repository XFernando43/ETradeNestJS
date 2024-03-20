import { Module } from '@nestjs/common';
import { CategoriesService } from '../Application/Service/categories.service';
import { CategoriesController } from '../Application/Controller/categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
