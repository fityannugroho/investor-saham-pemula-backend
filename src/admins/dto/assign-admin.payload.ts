import { PickType } from '@nestjs/mapped-types';
import { AdminValidator } from './AdminValidator';

export class AssignAdminRolePayload extends PickType(AdminValidator, [
  'userId',
] as const) {}
