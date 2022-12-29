import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  /****************Admins CRUD********************/
  findAllAdmins(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  findOneAdmin(id: number): Promise<Admin> {
    return this.adminRepository.findOneBy({ id });
  }

  createAdmin(admin: Admin): Promise<InsertResult> {
    return this.adminRepository.insert(admin);
  }

  async updateadmin(id: number, admin: Admin): Promise<UpdateResult> {
    const adminList: Admin[] = await this.adminRepository.findBy({ id })
    if(adminList && adminList.length){
      return this.adminRepository.update(id, admin);
    }else{
      return new Promise<UpdateResult>((resolve, reject) => {
        //  resolve(null)
      })
    }
  }

  async removeAdmin(id: number): Promise<DeleteResult> {
    return await this.adminRepository.delete(id);
  }

}