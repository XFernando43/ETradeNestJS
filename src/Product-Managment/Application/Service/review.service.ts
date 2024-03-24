import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../../Domain/Dto/Review/create-review.dto';
import { UpdateReviewDto } from '../../Domain/Dto/Review/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/Product-Managment/Domain/Entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private ReviewRepository:Repository<Review>){}
  async create(createReviewDto: CreateReviewDto) {
    try{

    }catch(error){
      
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
