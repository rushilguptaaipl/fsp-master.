import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from '../dto/createRoleDto';
import { RolesService } from '../services/roles.service';
import { UpdateRoleDto } from '../dto/updateRoleDto';
import { AuthGuard } from '../auth.guard';
import { AssignRoleDto } from '../dto/assignRoleDto';
import { DeleteAssignedRoleDto } from '../dto/deleteAssignedRoleDto';
import { AssignPermissionToRoleDto } from '../dto/assignPermissionToRoleDto';
import { RemovePermissionFromRoleDto } from '../dto/removePermissionFromRoleDto';
import { Roles } from '../custom-decorators/roles.decorator';
import { RolesGuard } from '../roles.guard';

@Controller('roles')
@UseGuards(AuthGuard)
export class RolesController {
  constructor(private readonly roleService: RolesService) {}
  @Roles('super_admin', 'admin')
  @UseGuards(RolesGuard)
  @Post('create')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Roles('super_admin', 'admin')
  @UseGuards(RolesGuard)
  @Get('searchall')
  listAllRoles() {
    return this.roleService.listAllRoles();
  }

  @Roles('super_admin', 'admin')
  @UseGuards(RolesGuard)
  @Get('searchone/:id')
  findOneRole(@Param('id') id: number) {
    return this.roleService.findOneRole(id);
  }

  @Roles('super_admin', 'admin')
  @UseGuards(RolesGuard)
  @Post('update/:id')
  updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Roles('super_admin', 'admin')
  @UseGuards(RolesGuard)
  @Get('delete/:id')
  deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }

  @Roles('super_admin', 'admin')
  @UseGuards(RolesGuard)
  @Post('assign-role')
  assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return this.roleService.assignRole(assignRoleDto);
  }

  @Roles('super_admin', 'admin')
  @UseGuards(RolesGuard)
  @Post('delete-role')
  deleteAssignedRole(@Body() deleteAssignedRole: DeleteAssignedRoleDto) {
    return this.roleService.deleteAssignedRole(deleteAssignedRole);
  }

  @Roles('super_admin', 'admin')
  @UseGuards(RolesGuard)
  @Post('assign-permission')
  assignPermission(
    @Body() assignPermissionToRoleDto: AssignPermissionToRoleDto,
  ) {
    return this.roleService.assignPermission(assignPermissionToRoleDto);
  }

  @Roles('super_admin', 'admin')
  @UseGuards(RolesGuard)
  @Post('delete-assign-permission')
  deleteAssignedPermission(
    @Body() removePermissionFromRoleDto: RemovePermissionFromRoleDto,
  ) {
    return this.roleService.deleteAssignedPermission(
      removePermissionFromRoleDto,
    );
  }
}
