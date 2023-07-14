import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto } from '../dto/createPermissionDto';
import { UpdatePermissionDto } from '../dto/updatePermissionDto';

@Controller('permission')
// @UseGuards(AuthGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @Post('create')
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.createPermission(createPermissionDto);
  }

  @Get('searchall')
  listAllPermission() {
    return this.permissionService.listAllPermission();
  }

  @Get('searchone/:id')
  findOnePermission(@Param('id') id: number) {
    return this.permissionService.findOnePermission(id);
  }

  @Post('update/:id')
  updatePermission(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.updatePermission(id, updatePermissionDto);
  }

  @Get('delete/:id')
  deletePermission(@Param('id') id: number) {
    return this.permissionService.deletePermission(id);
  }

  @Post("assign-permission")
  assignPermission(@Body() data:any){
    return this.permissionService.assignPermission(data);
  }
}
