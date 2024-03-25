import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/User-Managment/Domain/Entities/role.entity';
import { CreateRoleDto } from 'src/User-Managment/Domain/dto/role/create-role.dto';
import { UpdateRoleDto } from 'src/User-Managment/Domain/dto/role/update-role.dto';
import { Repository } from 'typeorm';


@Injectable()
export class RoleService {

  constructor(@InjectRepository(Role) private RoleRepository:Repository<Role>){}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const existingRole = await this.RoleRepository.findOne({
        where: {
          roleName: createRoleDto.roleName
        }
      });  
      if (existingRole) {
        throw new HttpException("Ya existe un rol con este nombre", HttpStatus.CONFLICT);
      }
      const newRole = this.RoleRepository.create(createRoleDto);
      return await this.RoleRepository.save(newRole);
    } catch (error) {
      console.error("Error al crear un nuevo rol:", error);
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const roles = await this.RoleRepository.find();
      if (roles.length > 0) {
        return roles;
      } else {
        return {
          status: HttpStatus.ACCEPTED,
          message: "No se encontraron roles",
          roles: roles
        };
      }
    } catch (error) {
      console.error("Error al buscar roles:", error);
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Role> {
    try {
      const role = await this.RoleRepository.findOne({
        where: {
          roleId: id
        }
      });
      if (role) {
        return role;
      } else {
        throw new HttpException("No se encontró el rol", HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error("Error al buscar un rol por ID:", error);
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const findRole = await this.RoleRepository.findOne({where:{roleId:id}});
      if (!findRole) {
        throw new HttpException("El rol no existe", HttpStatus.NOT_FOUND);
      } else {
        await this.RoleRepository.update(id, updateRoleDto);
        return {
          message: 'Rol actualizado exitosamente',
          role: updateRoleDto
        };
      }
    } catch (error) {
      console.error("Error al actualizar un rol:", error);
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const findRole = await this.RoleRepository.findOne({where:{roleId:id}});
      if (!findRole) {
        throw new HttpException("El rol no existe", HttpStatus.NOT_FOUND);
      } else {
        await this.RoleRepository.delete(id);
        return {
          status: HttpStatus.OK,
          message: 'Rol eliminado exitosamente'
        };
      }
    } catch (error) {
      console.error("Error al eliminar un rol:", error);
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
