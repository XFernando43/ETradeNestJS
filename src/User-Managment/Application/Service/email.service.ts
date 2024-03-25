import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from 'src/User-Managment/Domain/Entities/email.entity';
import { CreateEmailDto } from 'src/User-Managment/Domain/dto/email/create-email.dto';

@Injectable()
export class EmailService {

  constructor(@InjectRepository(Email) private readonly EmailRepository:Repository<Email>){}

  async create(createEmailDto: CreateEmailDto):Promise<Email> {
    try{
      const newEmail = await this.EmailRepository.create(createEmailDto);
      await this.EmailRepository.save(newEmail);
      return newEmail; 
    }catch(error){
      throw new HttpException(error,HttpStatus.BAD_GATEWAY);
    }
  }
  
  async findAll(): Promise<Email[]> {
    try {
      const emails = await this.EmailRepository.find();
      if (emails.length > 0) {
        return emails;
      } else {
        throw new HttpException("No se encontraron correos electrónicos", HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error("Error al buscar correos electrónicos:", error);
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async findOne(id: number): Promise<Email | undefined> {
    try {
      const email = await this.EmailRepository.findOne({
        where: {
          emailId: id
        }
      });
      if (email) {
        return email;
      } else {
        throw new HttpException(`No se encontró el correo electrónico con el ID ${id}`, HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error("Error al buscar correo electrónico por ID:", error);
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async update(id: number, updateEmailDto: any): Promise<Email | undefined> {
    try {
      const existingEmail = await this.EmailRepository.findOne({where:{emailId:id}});
  
      if (!existingEmail) {
        throw new HttpException(`No se encontró el correo electrónico con el ID ${id}`, HttpStatus.NOT_FOUND);
      }
  
      await this.EmailRepository.update(id, updateEmailDto);
      return await this.EmailRepository.findOne({where:{emailId:id}});
    } catch (error) {
      console.error("Error al actualizar correo electrónico:", error);
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async remove(id: number): Promise<void> {
    try {
      const existingEmail = await this.EmailRepository.findOne({where:{emailId:id}});
      if (!existingEmail) {
        throw new HttpException(`No se encontró el correo electrónico con el ID ${id}`, HttpStatus.NOT_FOUND);
      }
      await this.EmailRepository.delete(id);
    } catch (error) {
      console.error("Error al eliminar correo electrónico:", error);
      throw new HttpException("Error interno del servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  


}
