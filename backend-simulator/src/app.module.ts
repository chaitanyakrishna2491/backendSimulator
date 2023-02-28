import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './orders/order.module';
import { CartModule } from './cart/cart.module';
import { StoreModule } from './store/store.module';
import { StoreOrdersModule } from './store_orders/store_orders.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { UserModule } from './user/user.module';
import { DeliveryBoyModule } from './deliveryBoy/dBoy.module';
import { AdminModule } from './admin/admin.module';
import { RolesModule } from './roles/role.module';
import { AddressModule } from './address/address.module';
import { TokenAuthenticationMiddleware } from './middleware/tokenAuthentication';
import * as dotenv from 'dotenv'
import { CouponModule } from './coupon/coupon.module';
import { DealModule } from './deal/deal.module';
import { ProductRatingModule } from './productRating/productrRating.module';
import { RecentSearchModule } from './recentSearch/recentSearch.module';
import { MailModule } from './mail/mail.module';
import { SMSNotificationModule } from './sms/SMSNotification.module';
import { Users } from './user/entities/user.entity';
import { UsersService } from './user/user.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

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
    TypeOrmModule.forFeature([Users]),
    UserModule,
    ProductsModule,
    OrderModule,
    CartModule,
    StoreModule,
    StoreOrdersModule,
    CategoryModule,
    BrandModule,
    DeliveryBoyModule,
    AdminModule,
    RolesModule,
    AddressModule,
    CouponModule,
    DealModule,
    ProductRatingModule,
    RecentSearchModule,
    MailModule,
    SMSNotificationModule
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})

export class AppModule {
  constructor() {
    dotenv.config()
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenAuthenticationMiddleware)
      .exclude({ path: 'user/authenticate', method: RequestMethod.POST })
      .forRoutes('/');

    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
