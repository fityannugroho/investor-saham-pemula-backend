import { PickType } from '@nestjs/mapped-types';
import { UserValidator } from './UserValidator';

export class AddUserPayload extends PickType(UserValidator, [
  'name',
  'email',
  'password',
] as const) {}
