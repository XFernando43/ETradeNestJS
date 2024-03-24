import { Module } from '@nestjs/common';
import { ReviewService } from '../Application/Service/review.service';
import { ReviewController } from '../Application/Controller/review.controller';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
