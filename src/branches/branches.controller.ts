import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BranchesService } from './branches.service';
import { AddBranchPayload } from './dto/add-branch.payload';
import { GetBranchParam } from './dto/get-branch.param';
import { UpdateBranchPayload } from './dto/update-branch.payload';

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

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateBranch(
    @Param() { id }: GetBranchParam,
    @Body() payload: UpdateBranchPayload,
  ) {
    const updatedBranch = await this.branchesService.updateBranch(id, payload);
    return {
      statusCode: 200,
      message: 'Branch updated successfully',
      data: updatedBranch,
    };
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteBranch(@Param() { id }: GetBranchParam) {
    await this.branchesService.deleteBranch(id);
    return {
      statusCode: 200,
      message: 'Branch deleted successfully',
    };
  }
}
