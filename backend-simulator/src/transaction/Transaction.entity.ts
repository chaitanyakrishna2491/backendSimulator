import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn() py_id:number;
    @Column() payment_id:string;
    @Column() amount:string;
    @Column() cart_id:string;
    @Column() payment_gateway:string;
    @Column() created_at:Date;
    @Column() updated_at:Date;
}
