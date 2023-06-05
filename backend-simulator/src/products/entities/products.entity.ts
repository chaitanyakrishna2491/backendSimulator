import { Entity, Column, PrimaryGeneratedColumn, OneToMany , OneToOne, ManyToOne,JoinColumn} from 'typeorm';
import { ProductVarient } from './productvarient.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { Cart } from 'src/cart/entities/cart.entity';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;
  
  @ManyToOne(() => Brand)
  brand?: Brand;

  @Column() cat_id?: number;
  @Column() brand_id?: number;
  @Column() product_name?: string;
  @Column() product_image?: string;
  @Column({default: 'Regular'}) type?: string;
  @Column({ default: 0 }) hide?: number;
  @Column({default: 0}) added_by?: number;
  @Column({default: 1}) approved?: number;
  @Column() admin_share?: string;
  @Column() featured?: number;

  @OneToMany(() => ProductVarient, (productVarient) => productVarient.product)
  product_varients?: ProductVarient[]

  // @OneToOne(() => Cart)
  //   @JoinColumn()
  //   Cart:Cart

  // @OneToOne(() => Cart, (cart) => cart.product)
  // cart?: Cart;
 
  @Column() price?: string;
  @Column() weight?: string;
  @Column() discount?: string;
  @Column() cartCount?: number;
  @Column() isFavourite?: boolean;
  @Column() detail?: string;
  @Column() review_count?:number
  @Column() ratingValue?: string;

}


