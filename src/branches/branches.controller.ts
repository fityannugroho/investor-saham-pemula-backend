import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BranchesService } from './branches.service';
import { AddBranchPayload } from './dto/add-branch.payload';
import { GetBranchParam } from './dto/get-branch.param';

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
  @UseGuards(JwtAuthGuard)
  async getBranches() {
    return await this.branchesService.getBranches();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getBranch(@Param() { id }: GetBranchParam) {
    return await this.branchesService.getBranch(id);
  }
}
