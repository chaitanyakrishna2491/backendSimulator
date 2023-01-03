import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Authentication{
    message: string
    authenticated: boolean
}