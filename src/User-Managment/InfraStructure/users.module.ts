import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Domain/Entities/user.entity';
import { UsersController } from '../Application/Controller/users.controller';
import { UsersService } from '../Application/Service/users.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]), 
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
