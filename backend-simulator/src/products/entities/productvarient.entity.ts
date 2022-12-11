import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductVarient {
  @PrimaryGeneratedColumn() varient_id: number;

  @Column() product_id: number
  @Column() quantity: number
  @Column() unit: string
  @Column() base_mrp: number
  @Column() base_price: number
  @Column() cost_price: number
  @Column() admin_share: number
  @Column() description: string
  @Column() varient_image: string
  @Column() ean: string
  @Column({default: 1}) approved: number
  @Column({default: 0}) added_by: number
  @Column() total_count: number

}