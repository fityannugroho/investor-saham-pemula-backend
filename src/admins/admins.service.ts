import { Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get an admin by id.
   * @param id The admin id.
   * @returns The admin.
   * @throws {NotFoundException} If the admin does not exist.
   */
  async getAdminById(id: string): Promise<Admin> {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  /**
   * Delete an admin.
   * @param id The admin id.
   * @throws {NotFoundException} If the admin does not exist.
   */
  async deleteAdmin(id: string): Promise<void> {
    await this.getAdminById(id);
    await this.prisma.admin.delete({ where: { id } });
  }
}
