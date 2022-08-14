import { Injectable } from '@nestjs/common';
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
   * Add new branch.
   * @param data The branch data.
   * @returns The branch id.
   */
  async addBranch(data: AddBranchDataType): Promise<string> {
    // TODO: Validate the `registrantId` field.

    const id = nanoid(16);
    const branch = await this.prisma.branch.create({
      data: { id, ...data },
      select: { id: true },
    });
    return branch.id;
  }
}
