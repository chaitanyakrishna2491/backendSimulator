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
  findAllRoless(): Promise<Roles[]> {
    return this.rolesRepository.find();
  }

  findOneRoles(id: number): Promise<Roles> {
    return this.rolesRepository.findOneBy({ id });
  }

  createRoles(roles: Roles): Promise<InsertResult> {
    return this.rolesRepository.insert(roles);
  }

  async updateroles(id: number, roles: Roles): Promise<UpdateResult> {
    const rolesList: Roles[] = await this.rolesRepository.findBy({ id })
    if(rolesList && rolesList.length){
      return this.rolesRepository.update(id, roles);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeRoles(id: number): Promise<DeleteResult> {
    return await this.rolesRepository.delete(id);
  }

}