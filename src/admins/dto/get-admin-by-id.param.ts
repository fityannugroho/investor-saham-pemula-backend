import { PickType } from '@nestjs/mapped-types';
import { AdminValidator } from './AdminValidator';

export class GetAdminByIdParam extends PickType(AdminValidator, [
  'id',
] as const) {}
