import { Role } from '@prisma/client';

export type GetUserByIdType = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
