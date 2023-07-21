import { Roles } from "src/auth/entity/roles.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export class RoleSeed implements Seeder{
    async run(factory:Factory ,connection :Connection){
        // await factory(Roles)().createMany(1)
        await connection
        .createQueryBuilder()
        .insert()
        .into(Roles)
        .values([
          { name: 'SUPER_ADMIN', guard_name: 'ERR' ,createdAt: new Date(), updatedAt:new Date(),deletedAt: null},
          { name: 'ADMIN', guard_name: 'ERR' ,createdAt: new Date(), updatedAt:new Date(),deletedAt: null},
          { name: 'USER', guard_name: 'ERR' ,createdAt: new Date(), updatedAt:new Date(),deletedAt: null}
        ])
        .execute() 
    }
}