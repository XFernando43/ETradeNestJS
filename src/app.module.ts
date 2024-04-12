import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { ReviewModule } from './Product-Managment/Infracstruture/review.module';

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
    SalesModule,
    CartModule,
    AddressModule,
    UsersModule,
    RoleModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*');
  }

}
