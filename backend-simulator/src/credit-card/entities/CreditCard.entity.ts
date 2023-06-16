import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CreditCard {
    @PrimaryGeneratedColumn() id:string;
    @Column() card_Number:string;
    @Column() user_Id?:number;
    @Column() company?:string;
    @Column() card_holder_name?:string;
    @Column() cvv?:string;
    @Column() expires_on?:string;
    
}