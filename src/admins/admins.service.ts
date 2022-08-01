import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Admin } from '@prisma/client';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Verify if the user id is exists.
   * @param {string} userId The user id.
   * @throws {BadRequestException} If the user does not exist, or if the user is already an admin.
   */
  async verifyUserId(userId: string): Promise<void> {
    try {
      await this.usersService.getUserById(userId);
    } catch {
      throw new BadRequestException(['User id is not exist']);
    }

    if (await this.prisma.admin.findUnique({ where: { userId } })) {
      throw new BadRequestException(['User id is already assigned']);
    }
  }

  /**
   * Assign a user to be an admin.
   * @param userId The user id.
   * @returns The admin id.
   * @throws {BadRequestException} If the user does not exist.
   */
  async assignAdminRole(userId: string): Promise<string> {
    await this.verifyUserId(userId);

    const id = nanoid(16);
    const result = await this.prisma.admin.create({
      data: { id, userId },
      select: { id: true },
    });

    return result.id;
  }

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
