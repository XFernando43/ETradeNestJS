import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Domain/Entities/user.entity';
import { UsersController } from '../Application/Controller/users.controller';
import { UsersService } from '../Application/Service/users.service';
import { Role } from '../Domain/Entities/role.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Role]), 
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
