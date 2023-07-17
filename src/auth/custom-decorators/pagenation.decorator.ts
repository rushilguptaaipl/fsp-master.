import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { log } from 'console';

export const pagenation = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // console.log(request);

    const current_page = request['query'];
    // console.log(current_page.page);

    const pagenation = {
      page: current_page.page,
      take: 2,
      skip: 2 * (current_page.page - 1),
    };

    return pagenation;
  },
);
