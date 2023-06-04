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

  async m7s(name:string,n?: number, page?: number):Promise<any> {
    var ab=await this.rolesRepository.find();
    var cd=[];
  for(var a of ab) {
      if(a.role_name.toLowerCase().includes(name.toLowerCase())) {
        cd.push(a);
      }
  }
    var v1=[];
    var v2=n||24;
    var v3=(page?((page-1)*v2):0);
    var r=0;let v5=v2;
    while(r<v3){v5++;r++;}
    
    var v4=Math.min(v5,cd.length);

    var gh=[];var k=0;
    console.log('startIndex:', v3, 'page:', page, 'pageSize:', v2,'v4==',v4);

    for (let i = v3; i <v4; i++) {
     gh[k]=cd[i];
     k++;
    }

      return gh;
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

  // async updateroles(role_id: number, roles: Roles): Promise<UpdateResult> {
  //   const rolesList: Roles[] = await this.rolesRepository.findBy({ role_id })
  //   if(rolesList && rolesList.length){
  //     return this.rolesRepository.update(role_id, roles);
  //   }else{
  //     return new Promise<UpdateResult>((resolve, reject) => {
  //       //  resolve(null)
  //     })
  //   }
  // }

  async updateroles(role_id: number, roles: Roles): Promise<UpdateResult> {
    const rc= await this.rolesRepository.findOneBy({ role_id })
    if(rc){
      return this.rolesRepository.update(role_id, {...rc,...roles});
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