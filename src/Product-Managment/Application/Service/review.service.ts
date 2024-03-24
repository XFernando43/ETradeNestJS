import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../../Domain/Dto/Review/create-review.dto';
import { UpdateReviewDto } from '../../Domain/Dto/Review/update-review.dto';

@Injectable()
export class ReviewService {
  create(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
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