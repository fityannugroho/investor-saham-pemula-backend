import { PickType } from '@nestjs/mapped-types';
import { MemberValidator } from './MemberValidator';

export class GetMemberParam extends PickType(MemberValidator, [
  'id',
] as const) {}
