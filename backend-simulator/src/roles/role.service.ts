import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Roles } from './entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}

  /****************Roless CRUD********************/
  findAllRoles(): Promise<Roles[]> {
    return this.rolesRepository.find();
  }

  findRolesPerUser(user_id: number): Promise<Roles[]>{
    return this.rolesRepository.findBy({ user_id });
  }

  findOneRoles(role_id: number): Promise<Roles> {
    return this.rolesRepository.findOneBy({ role_id });
  }

  createRoles(roles: Roles): Promise<InsertResult> {
    return this.rolesRepository.insert(roles);
  }

  async updateroles(role_id: number, roles: Roles): Promise<UpdateResult> {
    const rolesList: Roles[] = await this.rolesRepository.findBy({ role_id })
    if(rolesList && rolesList.length){
      return this.rolesRepository.update(role_id, roles);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeRoles(role_id: number): Promise<DeleteResult> {
    return await this.rolesRepository.delete(role_id);
  }

}