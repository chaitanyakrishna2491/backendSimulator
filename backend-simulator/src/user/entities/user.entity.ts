import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users{
    @PrimaryGeneratedColumn() id: number
    @Column() name: string
    @Column() email: string
    @Column() email_verified_at: string
    @Column() password: string
    @Column() remember_token: string
    @Column() user_phone: string
    @Column() device_id: string
    @Column() user_image: string
    @Column() user_city: number
    @Column() user_area: number
    @Column() otp_value: string
    @Column() status: number
    @Column() wallet: number
    @Column() rewards: number
    @Column() is_verified: number
    @Column() block: number
    @Column() reg_date: string
    @Column() app_update: number
    @Column() facebook_id: string
    @Column() referral_code: string
    @Column() membership: number
    @Column() mem_plan_start: string
    @Column() mem_plan_expiry: string
    @Column() created_at: string
    @Column() updated_at: string
}