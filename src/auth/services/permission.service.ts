import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermissionDto } from '../dto/createPermissionDto';
import { UpdatePermissionDto } from '../dto/updatePermissionDto';
import { Permission } from '../entity/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  createPermission(createPermissionDto: CreatePermissionDto) {
    return this.permissionRepository.save(createPermissionDto);
  }

  listAllPermission() {
    return this.permissionRepository.find();
  }

  findOnePermission(id: number) {
    return this.permissionRepository.find({ where: {id: id } });
  }

  updatePermission(id: number, updateRoleDto: UpdatePermissionDto) {
    return this.permissionRepository.update(id, updateRoleDto);
  }

  deletePermission(id:number){
    return this.permissionRepository.delete(id);
  }
}
