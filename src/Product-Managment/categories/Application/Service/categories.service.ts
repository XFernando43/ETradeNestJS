import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../../Domain/dto/create-category.dto';
import { UpdateCategoryDto } from '../../Domain/dto/update-category.dto';
import { Category } from '../../Domain/entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepository:Repository<Category>){}

  async getCateogries(){
    try{
        return await this.categoryRepository.find();
    }catch(error){
        throw new Error(`Error al buscar el Category: ${error.message}`);
    }
}

async getCategoryId(categoryId:number){
    try{
        const category = await this.categoryRepository.findOne({
            where:{
                categoryId:categoryId
            }
        });
        if(!category){
            return new HttpException('Category Doesnt Exists', HttpStatus.NOT_FOUND);
        }
        return category;
    }catch(error){
        throw new Error(`Error al buscar el Category: ${error.message}`);
    }
}

async createCategory(category:CreateCategoryDto){
    try{
        if (!category || Object.values(category).some(field => field === null || field === undefined || field === '')) {
            return new HttpException('Campos Vacios', HttpStatus.CONFLICT);
        }
        const foundCategory = await this.categoryRepository.findOne({
            where:{
                categoryName:category.categoryName
            }
        });
        if (foundCategory) {
            return new HttpException('Category Already Exists', HttpStatus.CONFLICT);
        }
        const newCategory = this.categoryRepository.create(category);
        return await this.categoryRepository.save(category);
    }catch(error){
        throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
    }
}

async deleteCategory(categoryId:number){
    try{
        console.log(categoryId);
        if(categoryId <= 0){
            return new HttpException('CategoryID no valid',HttpStatus.NOT_FOUND);
        }
        
        const findCategory = await this.categoryRepository.findOne({
            where:{
                categoryId:categoryId
            }
        })

        if(!findCategory){
            return new HttpException('Category not exist',HttpStatus.NOT_FOUND);
        }

        return await this.categoryRepository.delete(categoryId);

    }catch(error){
        throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
    }
}

async updateCategory(categoryId:number, category:UpdateCategoryDto){
    try{
        if(categoryId <= 0){
            return new HttpException('CategoryID no valid',HttpStatus.NOT_FOUND);
        }
        const findCategory = await this.categoryRepository.findOne({
            where:{
                categoryId:categoryId
            }
        })
        if(!findCategory){
            return new HttpException('Category not exist',HttpStatus.NOT_FOUND);
        }
        await this.categoryRepository.update(categoryId,category);   
        return {
            message:"Update it",
            category: category
        };
    }catch(error){
        throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
    }
}
}
