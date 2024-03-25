import { Module } from '@nestjs/common';
import { EmailController } from '../Application/Controller/email.controller';
import { EmailService } from '../Application/Service/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from '../Domain/Entities/email.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Email])],
  controllers: [EmailController],
  providers: [EmailService],
  exports:[EmailService]
})
export class EmailModule {}
