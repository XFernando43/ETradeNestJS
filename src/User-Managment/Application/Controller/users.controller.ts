import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../Service/users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/User-Managment/Domain/dto/users/create-user.dto';
import { UpdateUserDto } from 'src/User-Managment/Domain/dto/users/update-user.dto';

@Controller('users')
@ApiTags("Users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Param(':roleId') roleId:number) {
    return this.usersService.create(createUserDto, roleId);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
