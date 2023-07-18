import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from '../dto/createRoleDto';
import { RolesService } from '../services/roles.service';
import { UpdateRoleDto } from '../dto/updateRoleDto';
import { AuthGuard } from '../auth.guard';

@Controller('roles')
// @UseGuards(AuthGuard)
export class RolesController {
  constructor(private readonly roleService: RolesService) {}
  @Post('create')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get('searchall')
  listAllRoles() {
    return this.roleService.listAllRoles();
  }

  @Get('searchone/:id')
  findOneRole(@Param('id') id: number) {
    return this.roleService.findOneRole(id);
  }

  @Post('update/:id')
  updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Get('delete/:id')
  deleteRole(@Param('id') id:number){
    return this.roleService.deleteRole(id)
  }

  @Post("assign-role")
  assignRole(@Body() data:any){
    return this.roleService.assignRole(data);
  }

  @Post("delete-role")
  deleteAssignedRole(@Body() data:any){
    return this.roleService.deleteAssignedRole(data)
  }
}
