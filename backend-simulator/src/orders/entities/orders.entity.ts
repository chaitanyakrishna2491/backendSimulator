import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn() order_id: number
  @Column() user_id?: number
  @Column({ type: 'text' }) products_and_varients?: string
  // in swagger pass like this
  // "products_and_varients":
  // "[{\"product_id\":1,\"variants\":\"1,2,3\",\"count\":\"10,13,12\"},{\"product_id\":2,\"variants\":\"6,7,8\",\"count\":\"11,11,12\"}]"
  //note .......strictly avoid spaces... ...........It will be inserted in database as...
  // [{"product_id":1,"varients":"1,2,3","count":"10,13,12"},{"product_id":2,"varients":"6,7,8","count":"11,11,12"},]
  // varient_id=1,count=10.........varient_id=2,count=13.......

  @Column() store_id?: number
  @Column() address_id?: number
  @Column() cart_id?: number
  @Column() total_price?: number
  @Column() price_without_delivery?: number
  @Column() total_products_mrp?: number
  @Column() payment_method?: string
  @Column({default: 0}) paid_by_wallet?: number
  @Column({default: 0}) rem_price?: number
  @Column({default: 0}) avg_tax_per?:number
  @Column({default: 0}) total_tax_price?: number
  @Column() order_date?: Date
  @Column({default: '1900-01-01'}) delivery_date?: Date
  @Column({default: 0}) delivery_charge?: number
  @Column({default: ""}) time_slot?: string
  @Column({default: 0}) dboy_id?: number
  @Column({default: 'Pending'}) order_status?: string
  @Column({default: ""}) user_signature?: string
  @Column({default: "N/A"}) cancelling_reason?: string
  @Column({default: 0}) coupon_id?: number
  @Column({default: 0}) coupon_discount?: string
  @Column({default: "Pending"}) payment_status?: string
  @Column({default: 0}) cancel_by_store?: number
  @Column({default: 0}) dboy_incentive?: number
  @Column({default: ""}) updated_at?: string
  @Column({default: false}) is_gift?: boolean
  @Column({default: ""}) gift_message?: string

  @Column({default: false}) isconfirmed?:boolean
  @Column({default: ""}) order_confirm_timestamp?:string
  
  @Column({default: false}) isPlaced?:boolean
  @Column({default: ""}) order_placed_timestamp?:string
  @Column({default: false}) isShipped?:boolean
  @Column({default: ""}) order_shipped_timestamp?:string
  @Column({default: false}) isOutForDelivery?:boolean
  @Column({default: ""}) order_outForDelivery_timestamp?:string
  @Column({default: ""}) status?:string
  @Column({default: false}) isDelivered?:boolean
  @Column({default: ""}) order_delivered_timestamp?:string
  


  
}