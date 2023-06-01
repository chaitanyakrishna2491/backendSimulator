import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'userId',
})
@Controller()
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /****************Admin CRUD********************/
  @Get('admins')
  getAdmin(): Promise<Admin[]> {
    return this.adminService.findAllAdmins();
  }
  @Get('admin/:id')
  getAdminById(@Param('id') admin_id: number): Promise<Admin> {
    return this.adminService.findOneAdmin(admin_id);
  }
  @Post('admin')
  addAdmin(@Body() admin: Admin): Promise<InsertResult> {
    return this.adminService.createAdmin(admin);
  }
  @Put('admin/:id')
  updateadmin(@Param('id') admin_id: number, @Body() admin:Admin): Promise<UpdateResult> {
    return this.adminService.updateadmin(admin_id, admin);
  }
  @Delete('admin/:id')
  deleteAdmin(@Param('id') admin_id: number): Promise<DeleteResult> {
    return this.adminService.removeAdmin(admin_id);
  }
}
