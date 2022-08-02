import { PickType } from '@nestjs/mapped-types';
import { UserValidator } from './UserValidator';

export class GetUserByIdParam extends PickType(UserValidator, [
  'id',
] as const) {}
