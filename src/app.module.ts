import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [UsersModule, AuthModule,
  TypeOrmModule.forRoot({
    type:"mysql",
    port:3306,
    host:"localhost",
    username:"root",
    password:"",
    database:"auth", 
    entities:[User],
    synchronize:true
  }),
  AuthModule,
  UsersModule
  ],
  
  controllers: [AppController],
  providers: [AppService],
 
})
export class AppModule {}
