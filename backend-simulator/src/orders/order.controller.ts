import { Controller, Get, Param, Post, Put, Delete, Body, Headers } from '@nestjs/common';
import { OrdersService } from './order.service';
import { ProductsService } from '../products/products.service';
import { CartService } from '../cart/cart.service';
import { Orders } from './entities/orders.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ProductVarient } from 'src/products/entities/productvarient.entity';
import { Store_orders } from 'src/store_orders/entities/store_orders.entity';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { ORDER_CANCELLED, ORDER_PLACED, ORDER_REVISED } from 'src/constants/constants';
import { UsersService } from 'src/user/user.service';
import { Users } from 'src/user/entities/user.entity';
import { SMSNotification } from 'src/sms/SMSNotification.service';
import { MailService } from 'src/mail/mail.service';

@ApiHeader({
  name: 'userId',
})
@Controller('order')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
    private readonly userService: UsersService,
    private readonly twilioNotification: SMSNotification,
    private readonly mailService: MailService) {}

  /****************Orders CRUD********************/
  @Get('all')
  getOrders(@Headers('userId') user_id: number): Promise<Orders[]> {
    return this.ordersService.findAllOrders(user_id);
  }
  @Get(':id')
  getOrder(@Param('id') order_id: number): Promise<Orders> {
    return this.ordersService.findOneOrder(order_id);
  }
  @Get('status/:status')
  getOrderByStatus(@Param('status') order_status: string): Promise<Orders> {
    return this.ordersService.findOrderByStatus(order_status);
  }
  createStoreOrderEntity(): Store_orders{
    let store_order:Store_orders = new Store_orders();
    store_order.store_order_id = 0;
    return store_order;
  }
  @Post()
  async addOrder(@Body() order: Orders): Promise<InsertResult> {
    const result:InsertResult = await this.ordersService.createOrder(order);
    if(result.identifiers && result.identifiers[0] && result.identifiers[0].order_id){
      await this.cartService.removeFromCart(order.cart_id);
      const productvarient:ProductVarient = await this.productsService.findProductVarientByVarientId(order.varient_id)
      this.productsService.updateProductVarient(productvarient.varient_id, {...productvarient, ...{"total_count": (productvarient.total_count - order.count)}})
      //insert into store_orders
      const storeOrder:Store_orders = this.createStoreOrderEntity()//todo
      const user: Users = await this.userService.findOneUser(order.user_id);
      const userNotification = ORDER_PLACED.replace("$orderId", order.order_id.toString())
                                .replace("$paymentAmount", '$20')
                                .replace("$paymentId", "12345")
                                .replace("$deliveryEstimate", "30")
      // this.twilioNotification.send(user.user_phone, userNotification)
      this.mailService.sendMail(user.email, user.name, "SuccessfulOrder", "Order Confirmation")
    }
    return result;
  }
  @Put(':id')
  async updateorder(@Param('id') order_id: number, @Body() order:Orders): Promise<UpdateResult> {
    const result:UpdateResult = await this.ordersService.updateorder(order_id, order);
    if(result.affected){
      const user: Users = await this.userService.findOneUser(order.user_id);
      const userNotification = ORDER_REVISED.replace("$orderId", order_id.toString())
                                .replace("$time", new Date().toString())
      this.twilioNotification.send(user.user_phone, userNotification)
    }
    return result;
  }
  @Delete(':id')
  async deleteOrder(@Param('id') order_id: number): Promise<DeleteResult> {
    const orderDetails: Orders = await this.ordersService.findOneOrder(order_id);
    const result:DeleteResult = await this.ordersService.removeOrder(order_id);
    if(result.affected){
      const productvarient:ProductVarient = await this.productsService.findProductVarientByVarientId(orderDetails.varient_id)
      this.productsService.updateProductVarient(productvarient.varient_id, {...productvarient, ...{"total_count": (productvarient.total_count + orderDetails.count)}})
      const user: Users = await this.userService.findOneUser(orderDetails.user_id);
      const userNotification = ORDER_CANCELLED.replace("$orderId", order_id.toString())
                                .replace("$refundDays", process.env.refundDays)
      this.twilioNotification.send(user.user_phone, userNotification)
      //remove from store_orders //todo
    }
    return result;
  }
}
