import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  order_id: number
  @Column() user_id: number
  @Column() varient_id: number
  @Column() product_id: number
  @Column() count: number
  @Column() store_id: number
  @Column() address_id: number
  @Column() cart_id: number
  @Column() total_price: number
  @Column() price_without_delivery: number
  @Column() total_products_mrp: number
  @Column() payment_method: string
  @Column({default: 0}) paid_by_wallet: number
  @Column({default: 0}) rem_price: number
  @Column() avg_tax_per:number
  @Column() total_tax_price: number
  @Column() order_date: Date
  @Column() delivery_date: Date
  @Column({default: 0}) delivery_charge: number
  @Column() time_slot: string
  @Column({default: 0}) dboy_id: number
  @Column({default: 'Pending'}) order_status: string
  @Column() user_signature: string
  @Column() cancelling_reason: string
  @Column({default: 0}) coupon_id: number
  @Column({default: 0}) coupon_discount: string
  @Column() payment_status: string
  @Column({default: 0}) cancel_by_store: number
  @Column() dboy_incentive: number
  @Column() updated_at: string
  @Column() is_gift: boolean
  @Column() gift_message: string
}