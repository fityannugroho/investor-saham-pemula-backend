import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegistrantsService } from 'src/registrants/registrants.service';
import { parseIdCardUrl } from 'src/registrants/registrants.utils';
import { AddBranchDataType } from './dto/add-branch-data.type';
import { UpdateBranchDataType } from './dto/update-branch-data.type';

@Injectable()
export class BranchesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly registrantsService: RegistrantsService,
  ) {}

  /**
   * Verify if the branch email is already registered.
   * @param email The branch email.
   * @param id Pass the branch id to verify if the email is already registered for the same branch.
   * @throws {BadRequestException} If the branch email already exists.
   */
  async verifyBranchEmail(email: string, id?: string): Promise<void> {
    const branch = await this.prisma.branch.findUnique({
      where: { email },
      select: { id: true },
    });

    const isSameBranch = id && branch && id === branch.id;
    if (isSameBranch) {
      return;
    }

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

  /**
   * Get a branch.
   * @param id The branch id.
   * @returns The branch including the registrant.
   * @throws {NotFoundException} If the branch is not found.
   */
  async getBranch(id: string) {
    const branch = await this.prisma.branch.findUnique({
      where: { id },
      include: { registrant: true },
    });
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    return {
      ...branch,
      registrant: parseIdCardUrl(branch.registrant),
    };
  }

  /**
   * Update branch.
   * @param id The branch id.
   * @param data The branch data.
   * @throws {BadRequestException} If the branch email already exists or if the registrant id is not found.
   * @throws {NotFoundException} If the branch is not found.
   */
  async updateBranch(id: string, data: UpdateBranchDataType) {
    await this.verifyBranchEmail(data.email, id);
    await this.getBranch(id);

    return await this.prisma.branch.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete branch.
   * @param id The branch id.
   * @throws {NotFoundException} If the branch is not found.
   */
  async deleteBranch(id: string): Promise<void> {
    await this.getBranch(id);
    await this.prisma.branch.delete({ where: { id } });
  }
}
