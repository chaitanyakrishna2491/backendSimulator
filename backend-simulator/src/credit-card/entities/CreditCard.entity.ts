import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class CreditCard {

    @PrimaryColumn() card_Number:string;
    @Column() user_Id:number;
    @Column() company:string;
    @Column() card_holder_name:string;
    @Column() cvv:string;
    @Column() expires_on:string;
    
}