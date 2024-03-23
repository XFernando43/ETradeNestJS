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
      const newEmail = new Email(createUserDto.email,createUserDto.password); newEmail.user = userDb;
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

  async findAll() {
    try{
      const users = await this.userRepository.find({ relations: ['role'] });
      return {
        status:201,
        users: users
      }
    }catch(error){
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async findOne(id: number) {
    try{
      const user = await this.userRepository.findOne({where:{
        userId:id
      }})
      return {
        status:201,
        user: user
      }
    }catch(error){
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      const userFinded = await this.userRepository.findOne({
        where:{
          userId:id
        }
      })
      if(!userFinded){
        throw new HttpException("Usuario not found", HttpStatus.NOT_FOUND);
      }else{
        let userUpdated;
        if(updateUserDto.roleId){
          const roleFinded = await this.roleRepository.findOne({where:{roleId:updateUserDto.roleId}});
          userUpdated = new UpdateUserDto(updateUserDto.name,updateUserDto.username,updateUserDto.lastName,roleFinded);
        }
        
        userUpdated = new UpdateUserDto(updateUserDto.name,updateUserDto.username,updateUserDto.lastName);

        await this.userRepository.update(id,userUpdated);
        return {
          status:200,
          user: updateUserDto
        }  
      }
    }catch(error){
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
