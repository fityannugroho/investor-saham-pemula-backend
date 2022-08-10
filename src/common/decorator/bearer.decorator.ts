import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Get the bearer token from the request header.
 */
export const Bearer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return null;
    }

    const authScheme = authHeader.split(' ')[0];
    if (authScheme !== 'Bearer') {
      return null;
    }

    const token = authHeader.split(' ')[1];
    return token;
  },
);
