import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Roles } from '../entity/roles.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from '../dto/createRoleDto';
import { UpdateRoleDto } from '../dto/updateRoleDto';
import { User } from 'src/users/entities/user.entity';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { AssignRoleDto } from '../dto/assignRoleDto';
import { DeleteAssignedRoleDto } from '../dto/deleteAssignedRoleDto';
import { Permission } from '../entity/permission.entity';
import { AssignPermissionToRoleDto } from '../dto/assignPermissionToRoleDto';
import { RemovePermissionFromRoleDto } from '../dto/removePermissionFromRoleDto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    private readonly i18n: I18nService,
  ) {}

  // create role

  createRole(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }

  // list all roles

  listAllRoles() {
    return this.roleRepository.find();
  }

  // find single role

  findOneRole(id: number) {
    return this.roleRepository.find({ where: { id: id } });
  }

  // update role

  updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  // delete role

  deleteRole(id: number) {
    return this.roleRepository.delete(id);
  }

  // assign array of role to user

  async assignRole(assignRoleDto: AssignRoleDto) {
    const user = await this.usersRepository.findOne({
      where: { id: assignRoleDto.user_id },
      relations: { role: true },
    });

    console.log(user);

    if (!user) {
      return this.i18n.t('test.USER_NOT_EXIST', {
        lang: I18nContext.current().lang,
      });
    }

    const roles_arr = await this.roleRepository.findBy({
      id: In([assignRoleDto.role_id]),
    });

    if (roles_arr.length != assignRoleDto.role_id.length) {
      return this.i18n.t('test.ROLE_NOT_EXIST', {
        lang: I18nContext.current().lang,
      });
    }

    const objectValues = user.role.map((obj) => obj.id);

    console.log(objectValues);

    if (
      user.role.length != 0 &&
      user.role
        .map((id) => assignRoleDto.role_id.includes(+id.id))
        .includes(true)
    ) {
      return this.i18n.t('test.ROLE_ALREADY_ASSIGNED', {
        lang: I18nContext.current().lang,
      });
    }

    if (user.role.length == 0) {
      user.role = roles_arr;
    } else {
      const newArr = [...roles_arr, ...user.role];
      user.role = newArr;
    }

    return this.usersRepository.save(user);
  }

  // delete a role from user

  async deleteAssignedRole(deleteAssignedRole: DeleteAssignedRoleDto) {
    const user = await this.usersRepository.findOne({
      where: { id: deleteAssignedRole.user_id },
      relations: { role: true },
    });

    if (!user) {
      return this.i18n.t('test.USER_NOT_EXIST', {
        lang: I18nContext.current().lang,
      });
    }

    const test = user.role.map((id) => {
      if (id.id == deleteAssignedRole.role_id) {
        return true;
      }
    });

    if (test.includes(true)) {
      const role_arr = user.role;
      console.log(role_arr);

      const index = role_arr.findIndex(
        (item) => +item.id === deleteAssignedRole.role_id,
      );
      if (index > -1) {
        role_arr.splice(index, 1);
      }
      user.role = role_arr;
    } else {
      return this.i18n.t('test.ROLE_NOT_EXIST', {
        lang: I18nContext.current().lang,
      });
    }

    return this.usersRepository.save(user);
  }

  // assign permission to role
  async assignPermission(assignPermissionToRoleDto: AssignPermissionToRoleDto) {
    const role = await this.roleRepository.findOne({
      where: { id: assignPermissionToRoleDto.role_id },
      relations: { permissions: true },
    });

    console.log(role);

    if (!role) {
      return this.i18n.t('test.ROLE_NOT_EXIST', {
        lang: I18nContext.current().lang,
      });
    }

    const permission_arr = await this.permissionRepository.findBy({
      id: In([assignPermissionToRoleDto.permission_id]),
    });

    console.log(permission_arr);

    if (
      permission_arr.length != assignPermissionToRoleDto.permission_id.length
    ) {
      return this.i18n.t('test.PERMISSION_NOT_EXIST', {
        lang: I18nContext.current().lang,
      });
    }
    const objectValues = permission_arr.filter((obj) => assignPermissionToRoleDto.permission_id.includes(+obj.id)).length;

    console.log(objectValues);

    if (
      role.permissions.length != 0 &&
      role.permissions
        .map((id) => assignPermissionToRoleDto.permission_id.includes(+id.id))
        .includes(true)
    ) {
      return this.i18n.t('test.PERMISSIOM_ALREADY_ASSIGNED', {
        lang: I18nContext.current().lang,
      });
    }

    if (role.permissions.length == 0) {
      role.permissions = permission_arr;
    } else {
      const newArr = [...permission_arr, ...role.permissions];
      role.permissions = newArr;
    }

    return this.roleRepository.save(role);
  }

  // remove Permission from role
  async deleteAssignedPermission(removePermissionFromRoleDto: RemovePermissionFromRoleDto) {
    const role = await this.roleRepository.findOne({
      where: { id: removePermissionFromRoleDto.role_id },
      relations: { permissions: true },
    });

    if (!role) {
      return this.i18n.t('test.ROLE_NOT_EXIST', {
        lang: I18nContext.current().lang,
      });
    }

    const test = role.permissions.map((id) => {
      if (id.id == removePermissionFromRoleDto.permission_id) {
        return true;
      }
    });

    if (test.includes(true)) {
      const permission_arr = role.permissions;

      const index = permission_arr.findIndex(
        (item) => +item.id === removePermissionFromRoleDto.permission_id,
      );
      if (index > -1) {
        permission_arr.splice(index, 1);
      }
      role.permissions = permission_arr;
    } else {
      return this.i18n.t('test.PERMISSION_NOT_EXIST', {
        lang: I18nContext.current().lang,
      });
    }

    return this.roleRepository.save(role);
  }
}
