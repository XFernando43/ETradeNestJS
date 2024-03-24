import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../../Domain/Dto/Review/create-review.dto';
import { UpdateReviewDto } from '../../Domain/Dto/Review/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/Product-Managment/Domain/Entities/review.entity';
import { Repository } from 'typeorm';
import { User } from 'src/User-Managment/Domain/Entities/user.entity';
import { Product } from 'src/Product-Managment/Domain/Entities/product.entity';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private ReviewRepository:Repository<Review>,
              @InjectRepository(User) private UsertRepository:Repository<User>,
              @InjectRepository(Product) private ProductRepository:Repository<Product>,
  
              ){}
  async create(createReviewDto: CreateReviewDto) {
    try{
      const userFinded = await this.UsertRepository.findOne({where:{userId:createReviewDto.userId}});
      const productFinded = await this.ProductRepository.findOne({where:{productId:createReviewDto.ProductId}});
      let newReviewDto = new Review(createReviewDto.content,userFinded,productFinded);
      const newReview = await this.ReviewRepository.create(newReviewDto);
      await this.ReviewRepository.save(newReview);
      return{
        status:200,
        review: newReview
      }
    }catch(error){
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }

  async findByProduct(producId:number){
    try{
      const productFinded = await this.ProductRepository.findOne({where:{productId:producId}});
      const reviews = await this.ReviewRepository.find({
        where:{
          Product:productFinded
        }
      })
      return{
        status:200,
        reviews:reviews
      }
    }catch(error){
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
