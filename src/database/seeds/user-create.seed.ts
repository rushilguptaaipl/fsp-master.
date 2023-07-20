import { userInfo } from 'os';
import { User } from 'src/users/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateUser implements Seeder {
  async run(factory: Factory, connection: Connection) {
    await factory(User)().createMany(1);
    // console.log(users);
    
    //  await factory(User)(user).createMany(2);
    
    // console.log("hello");
    
    
  }
}
