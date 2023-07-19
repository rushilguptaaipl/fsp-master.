import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto } from '../dto/createPermissionDto';
import { UpdatePermissionDto } from '../dto/updatePermissionDto';
import { pagenation } from '../custom-decorators/pagenation.decorator';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Permission } from '../entity/permission.entity';
import { AssignPermissionDto } from '../dto/assignPermissionDto';
import { DeleteAssignedPermissionDto } from '../dto/deleteAssignedPermissionDto';

@Controller('permission')
// @UseGuards(AuthGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @Post('create')
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.createPermission(createPermissionDto);
  }

  // @Get('searchall')
  // listAllPermission(@pagenation() data: any) {
  //   return this.permissionService.listAllPermission(data);
  // }
  // .........................
  @Get('searchall')
  async getAllQuiz(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number ,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number ,
  ): Promise<Pagination<Permission>> {
    const options: IPaginationOptions = {
      limit,
      page,
    }
    return await this.permissionService.paginate(options);
  }
  // ....................

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

  @Post('assign-permission')
  assignPermission(@Body() assignPermissionDto: AssignPermissionDto) {
    return this.permissionService.assignPermission(assignPermissionDto);
  }


  @Post("delete-permission")
  deleteAssignedPermission(@Body() deleteAssignedPermission:DeleteAssignedPermissionDto){
    return this.permissionService.deleteAssignedPermission(deleteAssignedPermission)
  }
}
