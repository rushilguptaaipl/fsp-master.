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
import { UsersVerifiedOtp } from './entity/userVerifiedTOtp.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RolesGuard } from './roles.guard';

@Module({
  imports:[UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  TypeOrmModule.forFeature([Roles,Permission,UsersVerifiedOtp,User])
  ],
  controllers: [AuthController, RolesController, PermissionController],
  providers: [AuthService, RolesService, PermissionService,UsersService]
})
export class AuthModule {}
  