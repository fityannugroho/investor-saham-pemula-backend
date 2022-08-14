import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  /**
   * Get members.
   * @returns The members.
   */
  async getMembers() {
    const members = await this.prisma.member.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        acceptedAt: true,
      },
    });
    return members.map(({ acceptedAt, ...member }) => ({
      ...member,
      isAccepted: !!acceptedAt,
    }));
  }

  /**
   * Get member by id.
   * @param id The member id.
   * @returns The member.
   * @throws {NotFoundException} If the member does not exist.
   */
  async getMember(id: string) {
    const member = await this.prisma.member.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return member;
  }
}
