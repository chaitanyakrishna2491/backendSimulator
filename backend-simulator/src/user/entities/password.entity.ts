import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Password{
    id: number
    name: string
    email: string
    password: string
    user_phone: string
}