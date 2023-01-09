import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Users } from './entities/user.entity';
import { Password } from './entities/password.entity';
import { Authentication } from './entities/authentcation.entity';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  /****************Users CRUD********************/
  findAllUsers(): Promise<Users[]> {
    return this.userRepository.find();
  }

  findOneUser(id: number): Promise<Users> {
    return this.userRepository.findOneBy({ id });
  }

  async authenticateUser(user:Password):Promise<Authentication>{
    let retrievedUser: Users = null;
    if(user.id){
      retrievedUser = (await this.userRepository.findOneBy({"id": user.id}))
    }
    else if(user.email){
      retrievedUser = (await this.userRepository.findOneBy({"email": user.email}))
    }
    else if(user.name){
      retrievedUser = (await this.userRepository.findOneBy({"name": user.name}))
    }
    else if(user.user_phone){
      retrievedUser = (await this.userRepository.findOneBy({"user_phone": user.user_phone}))
    }
    let authResponse: Authentication = null;
    const result = await bcrypt.compare(user.password, retrievedUser.password)
      if(result){
        authResponse ={
          "authenticated" : true,
          "message" : 'User successfully authenticated',
          "token": this.generateJWT(retrievedUser.id)
        }
      } else{
        authResponse ={
          "authenticated" : false,
          "message" : 'Credentials invalid'
      }
    }
      return authResponse;
  }

  createUser(user: Users): Promise<InsertResult> {
    let result:Promise<InsertResult> = null;
    bcrypt.hash(user.password, 10/* salt rounds*/, (err,hash) => {
      result = this.userRepository.insert({...user, ...{"password":hash}});
    });
    return result;
    
  }

  async updateuser(id: number, user: Users): Promise<UpdateResult> {
    const userList: Users[] = await this.userRepository.findBy({ id })
    if(userList && userList.length){
      let result:Promise<UpdateResult> = null;
      bcrypt.hash(user.password, 10/* salt rounds*/, (err,hash) => {
        result = this.userRepository.update(id, {...user, ...{"password":hash}});
      });
      return result;
      
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeUser(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  generateJWT(id:number){
    const jwtSecretKey = process.env.jwtSecretKey
    const expiresIn = process.env.expiresIn
    const data = {
        time: Date(),
        userId:id,
    }
    const token = jwt.sign(data, jwtSecretKey+":"+id, { expiresIn: expiresIn });
    return token
  }
}