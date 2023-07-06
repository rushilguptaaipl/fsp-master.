import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const currentUser = createParamDecorator((data:unknown , ctx : ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest();
    const current_user = request['user'];
    return current_user.id;
}) 