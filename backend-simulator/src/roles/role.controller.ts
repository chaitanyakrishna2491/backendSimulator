import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { RolesService } from './role.service';
import { Roles } from './entities/roles.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@ApiHeader({
  name: 'userId',
})
@Controller()
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /****************Roless CRUD********************/
  @Get('roles')
  getRoles(): Promise<Roles[]> {
    return this.rolesService.findAllRoless();
  }
  @Get('role/:id')
  getRole(@Param('id') roles_id: number): Promise<Roles> {
    return this.rolesService.findOneRoles(roles_id);
  }
  @Post('role')
  addRoles(@Body() roles: Roles): Promise<InsertResult> {
    return this.rolesService.createRoles(roles);
  }
  @Put('role/:id')
  updateroles(@Param('id') roles_id: number, @Body() roles:Roles): Promise<UpdateResult> {
    return this.rolesService.updateroles(roles_id, roles);
  }
  @Delete('role/:id')
  deleteRoles(@Param('id') roles_id: number): Promise<DeleteResult> {
    return this.rolesService.removeRoles(roles_id);
  }
}
