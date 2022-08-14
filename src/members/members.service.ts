import { BadRequestException, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMemberDataType } from './dto/add-member-data.type';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Verify if the member email is already registered.
   * @param email The member email.
   * @throws {BadRequestException} If the member email already exists.
   */
  async verifyMemberEmail(email: string): Promise<void> {
    const member = await this.prisma.member.findUnique({
      where: { email },
      select: { id: true },
    });
    if (member) {
      throw new BadRequestException(['Email already exists']);
    }
  }

  /**
   * Add new member.
   * @param data The member data to add.
   * @returns The member id.
   * @throws {BadRequestException} If the member email already exists.
   */
  async addMember(data: AddMemberDataType): Promise<string> {
    await this.verifyMemberEmail(data.email);

    const id = nanoid(16);
    const member = await this.prisma.member.create({
      data: { id, ...data },
      select: { id: true },
    });
    return member.id;
  }
}
