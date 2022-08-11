import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Article } from '@prisma/client';
import { nanoid } from 'nanoid';
import { CategoriesService } from 'src/categories/categories.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDataType } from './dto/create-article-data.type';
import { UpdateArticleDataType } from './dto/update-article-data.type';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService,
  ) {}

  /**
   * Verify that the category id exists.
   * @param categoryId The category id.
   * @throws {BadRequestException} If the category id is not found.
   */
  async verifyCategoryId(categoryId: string) {
    try {
      await this.categoriesService.getCategory(categoryId);
    } catch (error) {
      throw new BadRequestException(['Unknown category id']);
    }
  }

  /**
   * Create new article.
   * @param data The article data that contains: `authorId`, `title`, `content`.
   * @returns The article id.
   * @throws {BadRequestException} If the category id is not found.
   */
  async createArticle(data: CreateArticleDataType): Promise<string> {
    if (data.categoryId) {
      await this.verifyCategoryId(data.categoryId);
    }

    const id = nanoid(16);
    const result = await this.prisma.article.create({
      data: { id, ...data },
      select: { id: true },
    });

    return result.id;
  }

  /**
   * Get articles, optionally filtered by title and sorted by `date` or `title`. Default: `date`.
   * @param search The search keyword.
   * @returns The articles.
   */
  async getArticles(search?: string, sortBy: 'date' | 'title' = 'date') {
    return await this.prisma.article.findMany({
      where: { title: { contains: search } },
      orderBy: sortBy === 'title' ? { title: 'asc' } : { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        photo: true,
        createdAt: true,
      },
    });
  }

  /**
   * Get an article by id.
   * @param id The article id.
   * @returns The article.
   * @throws {NotFoundException} If the article is not found.
   */
  async getArticle(id: string): Promise<Article> {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }

  /**
   * Update an article.
   * @param id The article id.
   * @param data The article data to update.
   * @returns The updated article.
   * @throws {NotFoundException} If the article is not found.
   */
  async updateArticle(
    id: string,
    data: UpdateArticleDataType,
  ): Promise<Article> {
    await this.getArticle(id);
    return await this.prisma.article.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete an article.
   * @param id The article id.
   * @throws {NotFoundException} If the article is not found.
   */
  async deleteArticle(id: string): Promise<void> {
    await this.getArticle(id);
    await this.prisma.article.delete({ where: { id } });
  }
}
