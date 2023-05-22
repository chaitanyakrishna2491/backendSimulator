import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favourites {
  @PrimaryGeneratedColumn() fav_id: number; 
  @Column() user_id:number;
  @Column() prod_id:number;
}