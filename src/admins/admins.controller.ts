import { Body, Controller, Post } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AssignAdminRolePayload } from './dto/assign-admin.payload';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  async assignAdminRole(@Body() payload: AssignAdminRolePayload) {
    const adminId = await this.adminsService.assignAdminRole(payload.userId);
    return {
      statusCode: 201,
      message: 'Admin role assigned successfully',
      data: { adminId },
    };
  }
}
