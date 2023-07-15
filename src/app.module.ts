import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/jwt/jwt.constants';
import { UserAddressModule } from './user-address/user-address.module';
import { User_address } from './user-address/entities/user-address.entity';
import { Roles } from './auth/entity/roles.entity';
import { Permission } from './auth/entity/permission.entity';
import { UsersVerifiedOtp } from './auth/entity/userVerifiedTOtp.entity';
import path from 'path';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: 'localhost',
      username: 'root',
      password: '',
      database: 'auth',
      entities: [User, User_address, Roles, Permission, UsersVerifiedOtp],
      synchronize: true,
      // logging:true
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        nl: 'nl',
      },
      loaderOptions: {
        // path: path.join(__dirname, '/i18n/'),
        path: [__dirname + '/i18n/'],
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    AuthModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UserAddressModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
