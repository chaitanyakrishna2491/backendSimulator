import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  cat_id: number;

  @Column()
  brand_id: number;

  @Column()
  product_name: string;
  
  @Column()
  product_image: string;

  @Column({default: 'Regular'})
  type: string;

  @Column({ default: 0 })
  hide: number;

  @Column({default: 0})
  added_by: number;

  @Column({default: 1})
  approved: number;

  @Column()
  admin_share: string;

}