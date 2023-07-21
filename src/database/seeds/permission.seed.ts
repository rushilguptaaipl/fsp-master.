import { Permission } from "src/auth/entity/permission.entity";
import { Connection, getManager } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export class PermissionSeed implements Seeder{
    async run(factory:Factory , connection :Connection){
        await connection
        .createQueryBuilder()
        .insert()
        .into(Permission)
        .values([
            {name:"create", guard_name:"ERR",createdAt: new Date(), updatedAt:new Date(),deletedAt: null}
        ])
        .execute()
    
    }
}