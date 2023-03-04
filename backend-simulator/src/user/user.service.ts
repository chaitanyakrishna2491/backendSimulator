import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Users } from './entities/user.entity';
import { LoginDetail } from './entities/loginDetail.entity';
import { Authentication } from './entities/authentcation.entity';
import { LOGIN_TOKEN } from 'src/constants/constants';
import * as speakeasy from "speakeasy";
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

  async authenticateUser(user:LoginDetail):Promise<Authentication>{
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
        const generatedJWT = this.generateJWT(retrievedUser.id)
        await this.updateuser(retrievedUser.id, {...retrievedUser, ...{"device_id":user.device_id, "remember_token": generatedJWT}}, false)
        authResponse ={
          "authenticated" : true,
          "message" : 'User successfully authenticated',
          "retrievedUser" : retrievedUser,
          "token": generatedJWT
        }
      } else{
        authResponse ={
          "authenticated" : false,
          "message" : 'Credentials invalid'
      }
    }
      return authResponse;
  }

  async logoutUser(userID:number):Promise<Authentication>{
    let retrievedUser: Users = await this.userRepository.findOneBy({"id": userID})

    await this.updateuser(retrievedUser.id, {...retrievedUser, ...{"device_id": "", "remember_token": ""}}, false)
    let authResponse ={
      "authenticated" : false,
      "message" : 'User successfully loggedOut'
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

  registerUser(): Promise<InsertResult>{
    var secret = speakeasy.generateSecret();

  }

  async updateuser(id: number, user: Users, encryptPassword: Boolean = false): Promise<UpdateResult> {
    if(encryptPassword){
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
    } else {
      return this.userRepository.update(id, user);
    }
  }

  async removeUser(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async markPhoneNumberAsConfirmed(userId: number): Promise<UpdateResult>{
    return this.userRepository.update(userId, {"is_verified": 1})
  }

  generateJWT(id:number){
    const jwtSecretKey = process.env.jwtSecretKey
    const expiresIn = process.env.expiresIn
    const data = {
        time: Date(),
        userId:id,
    }
    const token = jwt.sign(data, jwtSecretKey+":"+id,);// { expiresIn: expiresIn });
    return token
  }
}