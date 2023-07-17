import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Tax {
    @PrimaryColumn() tx_id:number;
    @Column() tax_name?:string;
    @Column() tax_type?:number;
    @Column() tax_per?:number;

    @Column() description?:string;

}

