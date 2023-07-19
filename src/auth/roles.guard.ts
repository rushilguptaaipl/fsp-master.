import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userservice: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getClass());

    const request = context.switchToHttp().getRequest();
    const test = request.body.user_id 
    if (request?.user) {
      const { user_id } = request.user;
      const user = await this.userservice.findById(test);

      return user.role.filter((role) => roles.includes(role.name)).length != 0;
    }
    return false;
  }
}
