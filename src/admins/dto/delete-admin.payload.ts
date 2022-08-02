import { PickType } from '@nestjs/mapped-types';
import { AdminValidator } from './AdminValidator';

export class DeleteAdminPayload extends PickType(AdminValidator, [
  'id',
] as const) {}
