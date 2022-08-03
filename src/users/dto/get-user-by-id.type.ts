import { Admin } from '@prisma/client';

export type GetUserByIdType = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  admin?: Admin;
};
