import { Module } from '@nestjs/common';
import { CategoriesService } from '../Application/Service/categories.service';
import { CategoriesController } from '../Application/Controller/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../Domain/Entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports:[CategoriesService] // siempre se debe indicar cuando se exporta un servicio para otro modulo
})
export class CategoriesModule {}
