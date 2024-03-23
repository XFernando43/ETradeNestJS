import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { Email } from 'src/User-Managment/Domain/Entities/email.entity';
import { Role } from 'src/User-Managment/Domain/Entities/role.entity';
import { User } from 'src/User-Managment/Domain/Entities/user.entity';
import { CreateUserDto } from 'src/User-Managment/Domain/dto/users/create-user.dto';
import { UpdateUserDto } from 'src/User-Managment/Domain/dto/users/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository:Repository<User>,
              @InjectRepository(Role) private roleRepository:Repository<Role>,
              @InjectRepository(Email) private emailRepository:Repository<Email>
              ){}

  async create(createUserDto: CreateUserDto, roleId:number) {
    try{

      let roleFinded = await this.roleRepository.findOne({where:{roleId:roleId}});
      const newUser = new User(createUserDto.name,createUserDto.username,createUserDto.lastName,createUserDto.bornDate,roleFinded);
      const userDb = await this.userRepository.create(newUser);
      await this.userRepository.save(userDb);

      const newEmail = new Email(createUserDto.email,createUserDto.password); newEmail.user = newUser;
      const EmailDb = await this.emailRepository.create(newEmail);      
      await this.emailRepository.save(EmailDb);
      
      return {
        status:201,
        user: newUser,
        email:newEmail
      }

    }catch(error){
      console.log(error);
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
