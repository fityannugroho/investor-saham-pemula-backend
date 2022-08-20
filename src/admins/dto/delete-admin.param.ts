import { PickType } from '@nestjs/mapped-types';
import { AdminValidator } from './AdminValidator';

export class DeleteAdminParam extends PickType(AdminValidator, [
  'id',
] as const) {}
