import { Module } from '@nestjs/common';
import { SalesService } from '../Application/Service/sales.service';
import { SalesController } from '../Application/Controller/sales.controller';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
