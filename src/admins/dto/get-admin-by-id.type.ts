import { PickType } from '@nestjs/mapped-types';
import { AdminValidator } from './AdminValidator';

class PickedAdmin extends PickType(AdminValidator, [
  'id',
  'name',
  'email',
] as const) {}

export type GetAdminByIdType = PickedAdmin;
