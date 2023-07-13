// import { User } from "src/users/entities/user.entity";
// import { Connection } from "typeorm";
// import { Factory, Seeder } from "typeorm-seeding";

// export class CreateUser implements Seeder {
//     async run(factory: Factory, connection: Connection) {
//      const user = await factory(User)().createMany(1);
//      await factory(User)(user).createMany(2);
//    }
//   }