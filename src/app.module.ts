import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './Product-Managment/Infracstruture/product.module';
import { CategoriesModule } from './Product-Managment/Infracstruture/categories.module';
import { SalesModule } from './Product-Managment/Infracstruture/sales.module';
import { CartModule } from './Product-Managment/Infracstruture/cart.module';
import { AddressModule } from './User-Managment/InfraStructure/address.module';
import { UsersModule } from './User-Managment/InfraStructure/users.module';
import { RoleModule } from './User-Managment/InfraStructure/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'etrade',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
      logging:true, 
    }),
    CategoriesModule,
    ProductModule,
    SalesModule,
    CartModule,
    AddressModule,
    UsersModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
