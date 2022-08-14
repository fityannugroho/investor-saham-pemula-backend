import { Body, Controller, Get, Post } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { AddBranchPayload } from './dto/add-branch.payload';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  async registerBranch(@Body() payload: AddBranchPayload) {
    const branchId = await this.branchesService.addBranch(payload);
    return {
      statusCode: 201,
      message: 'Branch registered successfully',
      data: { branchId },
    };
  }

  @Get()
  async getBranches() {
    return await this.branchesService.getBranches();
  }
}
