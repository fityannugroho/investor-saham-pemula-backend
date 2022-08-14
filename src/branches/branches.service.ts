import { BadRequestException, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegistrantsService } from 'src/registrants/registrants.service';
import { AddBranchDataType } from './dto/add-branch-data.type';

@Injectable()
export class BranchesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly registrantsService: RegistrantsService,
  ) {}

  /**
   * Verify if the branch email is already registered.
   * @param email The branch email.
   * @throws {BadRequestException} If the branch email already exists.
   */
  async verifyBranchEmail(email: string): Promise<void> {
    const branch = await this.prisma.branch.findUnique({
      where: { email },
      select: { id: true },
    });
    if (branch) {
      throw new BadRequestException(['Email already exists']);
    }
  }

  /**
   * Add new branch.
   * @param data The branch data.
   * @returns The branch id.
   */
  async addBranch(data: AddBranchDataType): Promise<string> {
    await this.verifyBranchEmail(data.email);
    // TODO: Validate the `registrantId` field.

    const id = nanoid(16);
    const branch = await this.prisma.branch.create({
      data: { id, ...data },
      select: { id: true },
    });
    return branch.id;
  }
}
