import { Module } from '@nestjs/common';
import { EmailController } from '../Application/Controller/email.controller';
import { EmailService } from '../Application/Service/email.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
