import { Controller, Get, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { GetAllRolesQuery } from './dto/get-all-roles.query';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getAllRoles(@Query() queries: GetAllRolesQuery) {
    const { sortBy = 'id', sortOrder = 'asc' } = queries;
    return this.rolesService.getAllRoles({ [sortBy]: sortOrder });
  }
}
