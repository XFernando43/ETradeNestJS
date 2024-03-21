import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../Domain/Entities/role.entity';
import { RoleController } from '../Application/Controller/role.controller';
import { RoleService } from '../Application/Service/role.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Role]), 
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
