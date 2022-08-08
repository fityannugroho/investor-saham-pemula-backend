import { AdminValidator } from './AdminValidator';

export type GetAdminByIdType = Pick<AdminValidator, 'id' | 'name' | 'email'>;
