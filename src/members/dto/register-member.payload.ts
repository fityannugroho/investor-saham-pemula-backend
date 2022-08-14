import { PickType } from '@nestjs/mapped-types';
import { MemberValidator } from './MemberValidator';

export class RegisterMemberPayload extends PickType(MemberValidator, [
  'name',
  'email',
  'gender',
  'age',
  'address',
  'socialMedia',
] as const) {}
