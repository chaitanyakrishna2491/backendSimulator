import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Users } from './entities/user.entity';
import { Password } from './entities/password.entity';
import { Authentication } from './entities/authentcation.entity';
const bcrypt = require('bcrypt');

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
    let hash: string = null;
    if(user.id){
      hash = (await this.userRepository.findOneBy({"id": user.id})).password
    }
    else if(user.email){
      hash = (await this.userRepository.findOneBy({"email": user.email})).password
    }
    else if(user.name){
      hash = (await this.userRepository.findOneBy({"name": user.name})).password
    }
    else if(user.user_phone){
      hash = (await this.userRepository.findOneBy({"user_phone": user.user_phone})).password
    }
    let authResponse: Authentication = null;
    const result = await bcrypt.compare(user.password, hash)//, (err, result) => {
      if(result){
        authResponse ={
          "authenticated" : true,
        "message" : 'User successfully authenticated'
        }
      } else{
        authResponse ={
          "authenticated" : false,
        "message" : 'Credentials invalid'
      }
    }
      return authResponse;
    //})
  }

  createUser(user: Users): Promise<InsertResult> {
    let result:Promise<InsertResult> = null;
    bcrypt.hash(user.password, 10/* salt rounds*/, (err,hash) => {
      console.log(hash)
      result = this.userRepository.insert({...user, ...{"password":hash}});
    });
    return result;
    
  }

  async updateuser(id: number, user: Users): Promise<UpdateResult> {
    const userList: Users[] = await this.userRepository.findBy({ id })
    if(userList && userList.length){
      let result:Promise<UpdateResult> = null;
      bcrypt.hash(user.password, 10/* salt rounds*/, (err,hash) => {
        console.log("hash", hash)
        console.log("user: ", JSON.stringify({...user, ...{"password":hash}}))
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

}