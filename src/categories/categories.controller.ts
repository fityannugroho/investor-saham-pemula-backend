import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetCategoriesQuery } from './dto/get-categories.query';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(@Query() { sortBy = 'id' }: GetCategoriesQuery) {
    return await this.categoriesService.getCategories(sortBy);
  }
}
