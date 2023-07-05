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
      entities: [User,User_address],
      synchronize: true,
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
