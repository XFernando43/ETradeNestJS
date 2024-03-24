import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../Domain/Dto/product/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../Domain/Entities/product.entity';
import { Repository } from 'typeorm';
// import { Category } from 'src/Product-Managment/Domain/Entities/category.entity';
import { ProductStatus } from 'src/Product-Managment/Domain/Enums/productStatus';
import { CategoriesService } from './categories.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    // @InjectRepository(Category) private categoryRepository: Repository<Category>,
    private CategoryService: CategoriesService,
  ) {}

  async getProducts() {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async getProduct(productId: number) {
    try {
      const product = await this.productRepository.findOne({
        relations: ['category'],
        where: {
          productId: productId,
        },
      });

      if (!product) {
        return new HttpException('Product Doesnt Exists', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      throw new Error(`Error al buscar el producto: ${error.message}`);
    }
  }

  async createProduct(_product: CreateProductDto) {
    try {
      if (
        !_product ||
        Object.values(_product).some(
          (field) => field === null || field === undefined || field === '',
        )
      ) {
        return new HttpException('Campos Vacios', HttpStatus.CONFLICT);
      }
      if (
        _product.productStatus !== 'FULLSTOCK' &&
        _product.productStatus !== 'NOTSTOCK' &&
        _product.productStatus !== 'INSTOCK' &&
        _product.productStatus !== 'DISCOUNTED'
      ) {
        return new HttpException('Status not valid', HttpStatus.CONFLICT);
      }

      if (_product.productStock === 0) {
        _product.productStatus = ProductStatus.OUTSTOCK;
      }

      const foundProduct = await this.productRepository.findOne({
        where: {
          productName: _product.productName,
        },
      });

      if (foundProduct) {
        return new HttpException('Product Already Exists', HttpStatus.CONFLICT);
      }












      // const category = await this.categoryRepository.findOne({
      //   where: {
      //     categoryId: _product.categoryId,
      //   },
      // });

      const category = await this.CategoryService.getCategoryId(_product.categoryId);
      

      if (!category) {
        return new HttpException('Category Not found', HttpStatus.CONFLICT);
      }

      const newProduct = new Product();
      newProduct.productName = _product.productName;
      newProduct.productDescription = _product.productName;
      newProduct.productPrice = _product.productPrice;
      newProduct.productStock = _product.productStock;
      newProduct.productStatus = _product.productStatus;
      newProduct.category = category;
      
      
      return await this.productRepository.save(newProduct);







    } catch (error) {
      throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
    }
  }

  async deleteProduct(productId: number) {
    try {
      const length = await this.productRepository.count();
      if (productId === 0) {
        return 'product no econtrado';
      } else {
      }
      this.productRepository.delete(productId);
    } catch (error) {
      throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
    }
  }

  async updateProduct(productId: number, product: CreateProductDto) {
    try {
      if (productId === 0) {
        return 'product no econtrado';
      } else {
        this.productRepository.update(productId, product);
      }
    } catch (error) {
      throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
    }
  }
}
