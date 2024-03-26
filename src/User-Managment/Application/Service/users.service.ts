import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { Cart } from 'src/Product-Managment/Domain/Entities/cart.entity';
import { Email } from 'src/User-Managment/Domain/Entities/email.entity';
import { User } from 'src/User-Managment/Domain/Entities/user.entity';
import { CreateUserDto } from 'src/User-Managment/Domain/dto/users/create-user.dto';
import { UpdateUserDto } from 'src/User-Managment/Domain/dto/users/update-user.dto';
import { Repository } from 'typeorm';
import { RoleService } from './role.service';
import { EmailService } from './email.service';
import { CartService } from 'src/Product-Managment/Application/Service/cart.service';
import { CreateEmailDto } from 'src/User-Managment/Domain/dto/email/create-email.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleRepository: RoleService,
    private emailRepository: EmailService,
    private CartRepository: CartService,
  ) {}

  async create(createUserDto: CreateUserDto, roleId: number) {
    try {
      let roleFinded = await this.roleRepository.findOne(roleId);
      const newUser = new User(
        createUserDto.name,
        createUserDto.username,
        createUserDto.lastName,
        createUserDto.bornDate,
        roleFinded,
      );
      const userDb = await this.userRepository.create(newUser);
      await this.userRepository.save(userDb);
      const newEmail = new CreateEmailDto(
        createUserDto.email,
        createUserDto.password,
        newUser.userId,
      );
      await this.emailRepository.create(newEmail);
      const newCart = new Cart(userDb);
      const cartDb = await this.CartRepository.create(newCart);
      return {
        status: HttpStatus.CREATED,
        user: newUser,
        email: newEmail,
        cart: cartDb,
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find({ relations: ['role'] });
      return {
        status: 201,
        users: users,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number):Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { userId: id },
        relations: ['role'],
      });
      if (!user) {
        throw new HttpException(
          `User with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      
      return user;

    } catch (error) {
      console.error('Error finding all users:', error);
      throw new HttpException(
        'Error finding all users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userFinded = await this.userRepository.findOne({
        where: {
          userId: id,
        },
      });
      if (!userFinded) {
        throw new HttpException(
          `User with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        let userUpdated;
        if (updateUserDto.roleId) {
          const roleFinded = await this.roleRepository.findOne(
            updateUserDto.roleId,
          );
          userUpdated = new UpdateUserDto(
            updateUserDto.name,
            updateUserDto.username,
            updateUserDto.lastName,
            roleFinded,
          );
        }
        userUpdated = new UpdateUserDto(
          updateUserDto.name,
          updateUserDto.username,
          updateUserDto.lastName,
        );
        await this.userRepository.update(id, userUpdated);
        return {
          status: HttpStatus.OK,
          user: updateUserDto,
        };
      }
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw new HttpException(
        `Error updating user with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const userFinded = await this.userRepository.findOne({
        where: { userId: id },
      });
      if (userFinded) {
        await this.userRepository.delete(id);
        return {
          status: HttpStatus.OK,
          message: `User with ID ${id} deleted successfully`,
        };
      } else {
        throw new HttpException(
          `User with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.error(`Error removing user with ID ${id}:`, error);
      throw new HttpException(
        `Error removing user with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
