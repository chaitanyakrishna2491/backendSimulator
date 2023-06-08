import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import * as dotenv from 'dotenv';
import { CouponModule } from './coupon/coupon.module';
import { DealModule } from './deal/deal.module';
import { ProductRatingModule } from './productRating/productrRating.module';
import { RecentSearchModule } from './recentSearch/recentSearch.module';
import { MailModule } from './mail/mail.module';
import { SMSNotificationModule } from './sms/SMSNotification.module';
import { Users } from './user/entities/user.entity';
import { UsersService } from './user/user.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { Brand } from './brand/entities/brand.entity';
import { Product } from './products/entities/products.entity';
import { SMSNotification } from './sms/SMSNotification.service';
import { FavouritesModule } from './favourites/favourites.module';
import { PaymentsModule } from './payments/payments.module';
import { TransactionModule } from './transaction/Transaction.module';
import { NotifyModule } from './notify/notify.module';
import { CreditCardModule } from './credit-card/credit-card.module';
import { HscreenModule } from './hscreen/hscreen.module';
import { PromotionalProductsModule } from './promotional-products/promotional-products.module';
import { ShippingModule } from './shipping/shipping.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
          return ({
          type: 'mariadb', // Replace with your database type
          host: configService.get<string>('PROD_DB_HOST'),
          port: configService.get<number>('PROD_DB_PORT'),
          username: configService.get<string>('PROD_DB_UNAME'),
          password: configService.get<string>('PROD_DB_PASS'),
          database: configService.get<string>('PROD_DB_NAME'),
          entities: [], // Add your entities here
          synchronize: true, // Set to false in production
        })
      },
      inject: [ConfigService],
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
    SMSNotificationModule,
    FavouritesModule,
    PaymentsModule,
    TransactionModule,
    NotifyModule,
    CreditCardModule,
     HscreenModule,
     PromotionalProductsModule,
     ShippingModule

    
  ],
  controllers: [AppController],
  providers: [AppService, UsersService,SMSNotification ],
})

export class AppModule {
  constructor() {
    dotenv.config()
  }

  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(TokenAuthenticationMiddleware)
    //   .exclude({ path: 'user/authenticate', method: RequestMethod.POST })
    //   .forRoutes('/');

    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
