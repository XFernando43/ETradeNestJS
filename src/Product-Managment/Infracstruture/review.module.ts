import { Module } from '@nestjs/common';
import { ReviewService } from '../Application/Service/review.service';
import { ReviewController } from '../Application/Controller/review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../Domain/Entities/review.entity';
import { User } from 'src/User-Managment/Domain/Entities/user.entity';
import { Product } from '../Domain/Entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Review,User,Product])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
