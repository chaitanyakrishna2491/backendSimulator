import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Users } from './entities/user.entity';

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

  createUser(user: Users): Promise<InsertResult> {
    return this.userRepository.insert(user);
  }

  async updateuser(id: number, user: Users): Promise<UpdateResult> {
    const userList: Users[] = await this.userRepository.findBy({ id })
    if(userList && userList.length){
      return this.userRepository.update(id, user);
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