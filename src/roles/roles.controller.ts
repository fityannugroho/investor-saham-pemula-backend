import { Controller, Get, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { FindAllQueries } from './dto/find-all.queries';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll(@Query() queries: FindAllQueries) {
    const { sortBy = 'id', sortOrder = 'asc' } = queries;
    return this.rolesService.findAll({ orderBy: { [sortBy]: sortOrder } });
  }
}
