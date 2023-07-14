import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermissionDto } from '../dto/createPermissionDto';
import { UpdatePermissionDto } from '../dto/updatePermissionDto';
import { Permission } from '../entity/permission.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createPermission(createPermissionDto: CreatePermissionDto) {
    return this.permissionRepository.save(createPermissionDto);
  }

  listAllPermission() {
    return this.permissionRepository.find();
  }

  findOnePermission(id: number) {
    return this.permissionRepository.find({ where: { id: id } });
  }

  updatePermission(id: number, updateRoleDto: UpdatePermissionDto) {
    return this.permissionRepository.update(id, updateRoleDto);
  }

  deletePermission(id: number) {
    return this.permissionRepository.delete(id);
  }

  async assignPermission(data) {
    const user = await this.usersRepository.findOne({
      where: { id: data.user_id },
      relations: { permission: true },
    });
    if (!user) {
      throw new UnauthorizedException('user not exist');
    }
    const permission = await this.permissionRepository.findOne({
      where: { id: data.permission_id },
    });
    if (!permission) {
      throw new UnauthorizedException('role not exist');
    }

    if (
      this.usersRepository.find({
        where: { id: data.user_id, permission: { id: data.permission_id } },
        relations: { permission: true },
      })
    ) {
      throw new UnauthorizedException('permission already assigned');
    }
    user.permission.push(permission);
    return this.usersRepository.save(user);
  }
}
