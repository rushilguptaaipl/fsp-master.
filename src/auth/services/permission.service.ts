import { Injectable, UnauthorizedException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermissionDto } from '../dto/createPermissionDto';
import { UpdatePermissionDto } from '../dto/updatePermissionDto';
import { Permission } from '../entity/permission.entity';
import { User } from 'src/users/entities/user.entity';
import { I18nContext, I18nService } from 'nestjs-i18n';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { log } from 'console';
import { numericAlphaChars } from '@ngneat/falso/lib/sequence';
import { DeleteAssignedPermissionDto } from '../dto/deleteAssignedPermissionDto';
import { AssignPermissionDto } from '../dto/assignPermissionDto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly i18n: I18nService,
  ) {}

  createPermission(createPermissionDto: CreatePermissionDto) {
    return this.permissionRepository.save(createPermissionDto);
  }

  // async listAllPermission(data: any) {
  //   const [entities, count]: [Partial<Permission[]>, number] =
  //     await this.permissionRepository.findAndCount({
  //       take: data.take,
  //       skip: data.skip,
  //     });

  //   // const permissions: Partial<Permission[]> =
  //   //   await this.permissionRepository.find({
  //   //     take: data.take,
  //   //     skip: data.skip,
  //   //   });

  //   console.log(count);

  //   return {
  //     current_item_count: entities.length,
  //     items_per_page: data.take,
  //     total_items: count,
  //     total_pages: Math.ceil(count / data.take),
  //     items: [entities],
  //   };
  // }
  // ?...................
  async paginate(options: IPaginationOptions): Promise<Pagination<Permission>> {
    const qb = this.permissionRepository.createQueryBuilder('q');
    qb.orderBy('q.id', 'DESC');
    qb.where({ name: 'create' });
    return paginate<Permission>(qb, options);
  }
  // ................................
  findOnePermission(id: number) {
    return this.permissionRepository.find({ where: { id: id } });
  }

  updatePermission(id: number, updateRoleDto: UpdatePermissionDto) {
    return this.permissionRepository.update(id, updateRoleDto);
  }

  deletePermission(id: number) {
    return this.permissionRepository.delete(id);
  }

  async assignPermission(assignPermissionDto:AssignPermissionDto) {
    const user = await this.usersRepository.findOne({
      where: { id: assignPermissionDto.user_id },
      relations: { permission: true },
    });

    console.log(user);

    if (!user) {
      return this.i18n.t('test.USER_NOT_EXIST', {
        lang: I18nContext.current().lang,
      });
    }

    const permission_arr = await this.permissionRepository.findBy({
      id: In([assignPermissionDto.permission_id]),
    });

    if (permission_arr.length != assignPermissionDto.permission_id.length) {
      throw this.i18n.t('test.PERMISSION_NOT_EXIST', {
        lang: I18nContext.current().lang,
      });
    }

    if (
      user.permission.length != 0 &&
      user.permission
        .map((id) => assignPermissionDto.permission_id.includes(+id.id))
        .includes(true)
    ) {
      return this.i18n.t('test.PERMISSION_ALREADY_ASSIGNED', {
        lang: I18nContext.current().lang,
      });
    }

    if (user.permission.length == 0) {
      user.permission = permission_arr;
    } else {
      const newArr = [...permission_arr, ...user.permission];
      user.permission = newArr;
    }

    return this.usersRepository.save(user);
  }

  async deleteAssignedPermission(deleteAssignedPermission: DeleteAssignedPermissionDto) {
    const user = await this.usersRepository.findOne({
      where: { id: deleteAssignedPermission.user_id },
      relations: { permission: true },
    });

    if (!user) {
      return this.i18n.t('test.USER_NOT_EXIST', {
        lang: I18nContext.current().lang,
      });
    }

    const test = user.permission.map((id) => {
      if (id.id == deleteAssignedPermission.permission_id) {
        return true;
      }
    });

    if (test.includes(true)) {
      const permission_arr = user.permission;
    

      const index = permission_arr.findIndex((item) => +item.id === deleteAssignedPermission.permission_id);
      if (index > -1) {
        permission_arr.splice(index, 1);
      }
      user.permission = permission_arr;
    } else {
      return this.i18n.t('test.PERMISSION_NOT_EXIST', {
        lang: I18nContext.current().lang,
      });
    }

    return this.usersRepository.save(user);
  }
}
