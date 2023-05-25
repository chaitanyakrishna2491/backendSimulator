import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notify {
    @PrimaryGeneratedColumn() notify_id:number;
    @Column() user_id:number;
    @Column() msg:string;
    @Column() sent_at:string;
    @Column() isDeleted:boolean;
}