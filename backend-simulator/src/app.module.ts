import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './orders/order.module';
import { CartModule } from './cart/cart.module';
import { StoreModule } from './store/store.module';
import { StoreOrdersModule } from './store_orders/store_orders.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db1',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductsModule,
    OrderModule,
    CartModule,
    StoreModule,
    StoreOrdersModule,
    CategoryModule,
    BrandModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

}
