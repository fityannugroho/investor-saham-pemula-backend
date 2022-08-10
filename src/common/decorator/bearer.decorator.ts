import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Get payload from the bearer token in request header.
 *
 * **Note:** This decorator depends on global `PassportModule` in `AppModule`.
 */
export const Bearer = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const payload = request.payload;

    return data ? payload?.[data] : payload;
  },
);
