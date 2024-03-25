import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Domain/Entities/user.entity';
import { UsersController } from '../Application/Controller/users.controller';
import { UsersService } from '../Application/Service/users.service';
import { Role } from '../Domain/Entities/role.entity';
import { Email } from '../Domain/Entities/email.entity';
import { Cart } from 'src/Product-Managment/Domain/Entities/cart.entity';
import { CartModule } from 'src/Product-Managment/Infracstruture/cart.module';
import { EmailModule } from './email.module';
import { RoleModule } from './role.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    CartModule,
    EmailModule,
    RoleModule, 
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
