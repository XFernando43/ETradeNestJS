import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './Product-Managment/product/product.module';
import { CategoriesModule } from './Product-Managment/categories/Infracstructure/categories.module';


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
      synchronize: false,
      logging:true, 
    }),
    CategoriesModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
