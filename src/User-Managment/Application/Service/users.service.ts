import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { Role } from 'src/User-Managment/Domain/Entities/role.entity';
import { User } from 'src/User-Managment/Domain/Entities/user.entity';
import { CreateUserDto } from 'src/User-Managment/Domain/dto/users/create-user.dto';
import { UpdateUserDto } from 'src/User-Managment/Domain/dto/users/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository:Repository<User>,
              @InjectRepository(Role) private roleRepository:Repository<Role>
              ){}

  async create(createUserDto: CreateUserDto, roleId:number) {
    try{

      let roleFinded = await this.roleRepository.findOne({where:{roleId:roleId}});

      const newUser = new User();
      newUser.username = createUserDto.username;
      newUser.name = createUserDto.name;
      newUser.lastName = createUserDto.lastName;
      newUser.bornDate = createUserDto.bornDate;
      newUser.role = roleFinded;
      
      const UserSaved = this.userRepository.create(createUserDto);
      this.userRepository.save(newUser);

      return UserSaved;
      
    }catch(error){
      throw new HttpException("Error in server" + error, HttpStatus.CONFLICT);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
