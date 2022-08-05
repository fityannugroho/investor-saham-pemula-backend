import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { DeleteAdminPayload } from './dto/delete-admin.payload';
import { GetAdminByIdParam } from './dto/get-admin-by-id.param';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('/:id')
  async getAdminById(@Param() params: GetAdminByIdParam) {
    return await this.adminsService.getAdminById(params.id);
  }

  @Delete()
  async deleteAdmin(@Body() payload: DeleteAdminPayload) {
    await this.adminsService.deleteAdmin(payload.id);
    return {
      statusCode: 200,
      message: 'Admin deleted successfully',
    };
  }
}
