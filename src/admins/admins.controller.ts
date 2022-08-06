import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { DeleteAdminParam } from './dto/delete-admin.param';
import { GetAdminByIdParam } from './dto/get-admin-by-id.param';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('/:id')
  async getAdminById(@Param() params: GetAdminByIdParam) {
    return await this.adminsService.getAdminById(params.id);
  }

  @Delete('/:id')
  async deleteAdmin(@Param() params: DeleteAdminParam) {
    await this.adminsService.deleteAdmin(params.id);
    return {
      statusCode: 200,
      message: 'Admin deleted successfully',
    };
  }
}
