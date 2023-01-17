import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductRating {
  @PrimaryGeneratedColumn()
  rate_id: number
  @Column() store_id: number
  @Column() varient_id: number
  @Column() rating: string
  @Column() description: string
  @Column() user_id: number
  @Column() created_at: string
  @Column() updated_at: string
  @Column() hide: string
}