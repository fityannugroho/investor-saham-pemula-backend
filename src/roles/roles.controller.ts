import { Controller, Get, Param, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { GetAllRolesQuery } from './dto/get-all-roles.query';
import { GetRoleByIdParam } from './dto/get-role-by-id.param';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getAllRoles(@Query() queries: GetAllRolesQuery) {
    const { sortBy = 'id', sortOrder = 'asc' } = queries;
    return this.rolesService.getAllRoles({ [sortBy]: sortOrder });
  }

  @Get('/:id')
  async getRoleById(@Param() params: GetRoleByIdParam) {
    const { id } = params;
    return this.rolesService.getRoleById(id);
  }
}
