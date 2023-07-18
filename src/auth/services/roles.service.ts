import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Roles } from '../entity/roles.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from '../dto/createRoleDto';
import { UpdateRoleDto } from '../dto/updateRoleDto';
import { User } from 'src/users/entities/user.entity';
import { log } from 'console';

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

    const roles_arr = await this.roleRepository.findBy({
      id: In([data.role_id]),
    });

    if (roles_arr.length != data.role_id.length) {
      throw new UnauthorizedException('no role !!!');
    }

    for (let i = 0; i < data.role_id.length; i++) {
      const role = await this.usersRepository.find({
        where: { id: user.id, role: { id: data.role_id[i] } },
        relations: { role: true },
      });

      if (role.length == 0) {
        user.role.push(roles_arr[i]);
      } else {
        throw new UnauthorizedException('role already assigned');
      }
    }
    return this.usersRepository.save(user);
  }

  async deleteAssignedRole(data: any) {
    const user = await this.usersRepository.findOne({
      where: { id: data.user_id },
      relations: { role: true },
    });
    console.log(user);
    
    if (!user) {
      throw new UnauthorizedException('user not exist');
    }

    const indexToDelete = user.role.findIndex(obj => console.log( obj.id === data.role_id)
   );
    console.log(indexToDelete);
    
    
    
    if (indexToDelete !== -1) {
      user.role.splice(indexToDelete, 1);
    }
    return this.usersRepository.update(user.id , {user.role :user})

    // for (let i = 0; i < data.role_id.length; i++) {
    //   const role = await this.usersRepository.find({
    //     where: { id: user.id, role: { id: data.role_id[i] } },
    //     relations: { role: true },
    //   });
    //   if (role.length != 0) {
    //     this.usersRepository.update({user: });
    //   } 
    // }
  }
}
