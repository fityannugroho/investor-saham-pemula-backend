import { Injectable } from '@nestjs/common';
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
}
