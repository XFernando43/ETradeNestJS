import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/User-Managment/Domain/Entities/role.entity';
import { CreateRoleDto } from 'src/User-Managment/Domain/dto/role/create-role.dto';
import { UpdateRoleDto } from 'src/User-Managment/Domain/dto/role/update-role.dto';
import { Repository } from 'typeorm';


@Injectable()
export class RoleService {

  constructor(@InjectRepository(Role) private RoleRepository:Repository<Role>){}

  async create(createRoleDto: CreateRoleDto) {
    try{
      const newRole = await this.RoleRepository.create(createRoleDto);
      return await this.RoleRepository.save(newRole);
    }catch(error){
      throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
    }
  }

  async findAll() {
    try{
      const roles = await this.RoleRepository.find();
      if(roles.length > 0){
        return roles;
      }else{
        return {
          status:HttpStatus.ACCEPTED,
          message:"roles vacios",
          roles:roles
        }
      }
    }catch(error){
      throw new Error(`Error al buscar el Role: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try{
      const role = await this.RoleRepository.findOne({
        where:{
          roleId:id
        }
      })
      if(role){
        return role;
      }else{
        return{
          status: HttpStatus.NOT_FOUND,
          message:"Role not found"
        }
      }
    }catch(error){
      throw new Error(`Error al buscar el Role: ${error.message}`);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try{
      if (id <= 0) {
        return new HttpException('RoleID not valid', HttpStatus.NOT_FOUND);
      }

      const findRole= await this.RoleRepository.findOne({
        where: {
            roleId: id,
        },
      });

      if (!findRole) {
        return new HttpException('Role not exist', HttpStatus.NOT_FOUND);
      }else{
        const roleUpdated =  await this.RoleRepository.update(id, updateRoleDto);
        return {
          message: 'Update it',
          Role: updateRoleDto,
        };
      }

    }catch(error){
      throw new Error(`Error al actualizar el Role: ${error.message}`);
    }
  }

  async remove(id: number) {
    try{
            if (id <= 0) {
                return new HttpException('RoleID no valid', HttpStatus.NOT_FOUND);
            }

            const findRole = await this.RoleRepository.findOne({
                where: {
                    roleId: id,
                },
            });

            if (!findRole) {
                return {
                  status: HttpStatus.NOT_FOUND,
                  message:"Role not exist"
                }
            }

            return await this.RoleRepository.delete(id);
    }catch(error){
      throw new Error(`Ocurrió un error en el servidor: ${error.message}`);
    }
  }
}
