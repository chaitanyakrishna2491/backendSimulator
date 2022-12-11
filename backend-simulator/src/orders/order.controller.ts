import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { OrdersService } from './order.service';
import { Orders } from './entities/orders.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /****************Orders CRUD********************/
  @Get()
  getOrders(): Promise<Orders[]> {
    return this.ordersService.findAllOrders();
  }
  @Get('order/:id')
  getOrder(@Param('id') order_id: number): Promise<Orders> {
    return this.ordersService.findOneOrder(order_id);
  }
  @Post('order')
  addOrder(@Body() order: Orders): Promise<InsertResult> {
    return this.ordersService.createOrder(order);
  }
  @Put('order/:id')
  updateorder(@Param('id') order_id: number, @Body() order:Orders): Promise<UpdateResult> {
    return this.ordersService.updateorder(order_id, order);
  }
  @Delete('order/:id')
  deleteOrder(@Param('id') order_id: number): Promise<DeleteResult> {
    return this.ordersService.removeOrder(order_id);
  }
}
