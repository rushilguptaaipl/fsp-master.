import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Roles } from '../entity/roles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from '../dto/createRoleDto';
import { UpdateRoleDto } from '../dto/updateRoleDto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createRole(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }

  listAllRoles() {
    return this.roleRepository.find();
  }

  findOneRole(id: number) {
    return this.roleRepository.find({ where: { id: id } });
  }

  updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  deleteRole(id: number) {
    return this.roleRepository.delete(id);
  }

  async assignRole(data) {
    const user = await this.usersRepository.findOne({
      where: { id: data.user_id },
      relations: { role: true },
    });
    if (!user) {
      throw new UnauthorizedException('user not exist');
    }
    const role = await this.roleRepository.findOne({
      where: { id: data.role_id },
    });
    if (!role) {
      throw new UnauthorizedException('role not exist');
    }

    user.role.push(role);
    return this.usersRepository.save(user);
  }
}
