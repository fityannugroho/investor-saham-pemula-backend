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
   * Verify if the registrant id is exist.
   * @param registrantId The registrant id.
   */
  async verifyRegistrantId(registrantId: string): Promise<void> {
    try {
      await this.registrantsService.getRegistrant(registrantId);
    } catch (error) {
      throw new BadRequestException(['Unknown registrant id']);
    }
  }

  /**
   * Add new branch.
   * @param data The branch data.
   * @returns The branch id.
   */
  async addBranch(data: AddBranchDataType): Promise<string> {
    await this.verifyBranchEmail(data.email);
    await this.verifyRegistrantId(data.registrantId);

    const id = nanoid(16);
    const branch = await this.prisma.branch.create({
      data: { id, ...data },
      select: { id: true },
    });
    return branch.id;
  }

  /**
   * Get branches.
   * @returns The branches.
   */
  async getBranches() {
    return this.prisma.branch.findMany();
  }
}
