import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address{
    @PrimaryGeneratedColumn() address_id: number
    @Column() type: string
    @Column() user_id: number
    @Column() receiver_name: string
    @Column() receiver_phone: string
    @Column() city: string
    @Column() society: string
    @Column() city_id: number
    @Column() society_id: number
    @Column() house_no: string
    @Column() landmark: string
    @Column() state: string
    @Column() pincode: string
    @Column() lat: string
    @Column() lng: string
    @Column() select_status: number
    @Column() added_at: string
    @Column() updated_at: string
}