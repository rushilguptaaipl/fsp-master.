import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Permission } from 'src/auth/entity/permission.entity';
import { Roles } from 'src/auth/entity/roles.entity';
import { UsersVerifiedOtp } from 'src/auth/entity/userVerifiedTOtp.entity';
import { User_address } from 'src/user-address/entities/user-address.entity';
import { User } from 'src/users/entities/user.entity';

// export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: async (): Promise<TypeOrmModuleOptions> => {
//     return {
//       type: 'mysql',
//       port: 3306,
//       host: 'localhost',
//       username: 'root',
//       password: '',
//       database: 'auth',
//       entities: [__dirname + '/../**/*.entity.{js,ts}'],
//       migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//       // cli: {
//       //   migrationsDir: __dirname + '/../database/migrations',
//       // },
//       extra: {
//         charset: 'utf8mb4_unicode_ci',
//       },
//       synchronize: false,
//       logging: true,
//     };
//   },
// };

 config();
const configService = new ConfigService();
module.exports = {
  type: 'mysql',
  port: 3306,
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'auth',
  synchronize: true,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: [
    __dirname + '/migrations/**/*{.ts,.js}',
  ],
  factories: ["dist/**/factory/**/*.{js, ts}"],
  seeds: ["dist/**/seeds/**/*.{js, ts}"],
}

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   port: 3306,
//   host: 'localhost',
//   username: 'root',
//   password: '',
//   database: 'auth',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   // entities: [User, User_address, Roles, Permission, UsersVerifiedOtp],
//   migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],

//   // cli: {
//   //   migrationsDir: __dirname + '/../database/migrations',
//   // },
//   synchronize: true,

// };
