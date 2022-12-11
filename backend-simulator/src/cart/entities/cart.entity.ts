import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number
  @Column() product_id: number
  @Column() varient_id: number
  @Column() user_id: number
  @Column() qty: number

}