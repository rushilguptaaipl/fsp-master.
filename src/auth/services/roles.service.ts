import { Injectable } from '@nestjs/common';
import { Roles } from '../entity/roles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from '../dto/createRoleDto';
import { UpdateRoleDto } from '../dto/updateRoleDto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  createRole(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }

  listAllRoles() {
    return this.roleRepository.find();
  }

  findOneRole(id: number) {
    return this.roleRepository.find({ where: { role_id: id } });
  }

  updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  deleteRole(id:number){
    return this.roleRepository.delete(id);
  }
}
