import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { GetCategoriesQuery } from './dto/get-categories.query';
import { GetCategoryParam } from './dto/get-category.param';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(@Query() { sortBy = 'id' }: GetCategoriesQuery) {
    return await this.categoriesService.getCategories(sortBy);
  }

  @Get('/:id')
  async getCategory(@Param() { id }: GetCategoryParam) {
    return await this.categoriesService.getCategory(id);
  }
}
