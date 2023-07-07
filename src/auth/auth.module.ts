import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../config/jwt/jwt.constants';
import { RolesController } from './controller/roles.controller';
import { RolesService } from './services/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entity/roles.entity';
import { Permission } from './entity/permission.entity';
import { PermissionController } from './controller/permission.controller';
import { PermissionService } from './services/permission.service';

@Module({
  imports:[UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  TypeOrmModule.forFeature([Roles,Permission])
  ],
  controllers: [AuthController, RolesController, PermissionController],
  providers: [AuthService, RolesService, PermissionService]
})
export class AuthModule {}
  