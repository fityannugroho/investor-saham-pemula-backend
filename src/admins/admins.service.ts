import { BadRequestException, Injectable } from '@nestjs/common';
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
}
