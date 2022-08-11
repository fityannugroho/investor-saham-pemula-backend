import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all categories.
   * @param sortBy Sort the categories by `id` or `name`. Default: `id`.
   * @returns The categories.
   */
  async getCategories(sortBy: 'id' | 'name' = 'id'): Promise<Category[]> {
    return await this.prisma.category.findMany({
      orderBy: { [sortBy]: 'asc' },
    });
  }

  /**
   * Get a category by id.
   * @param id The category id.
   * @returns The category.
   * @throws {NotFoundException} If the category is not found.
   */
  async getCategory(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
}
