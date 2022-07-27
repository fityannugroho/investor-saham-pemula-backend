import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all roles. Optionally sort by a field and order.
   * @param {Prisma.RoleOrderByWithRelationInput} orderBy The field to sort by and the order to sort in.
   * @returns {Promise<Role[]>} All roles.
   */
  async getAllRoles(
    orderBy?: Prisma.RoleOrderByWithRelationInput,
  ): Promise<Role[]> {
    return this.prisma.role.findMany({ orderBy });
  }
}
