import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './Product-Managment/product/Infracstruture/product.module';
import { CategoriesModule } from './Product-Managment/categories/Infracstructure/categories.module';
import { SalesModule } from './sales/sales.module';
import { CartModule } from './cart/cart.module';


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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
