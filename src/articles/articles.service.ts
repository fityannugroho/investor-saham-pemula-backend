import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Article, Category } from '@prisma/client';
import { nanoid } from 'nanoid';
import { CategoriesService } from 'src/categories/categories.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDataType } from './dto/create-article-data.type';
import { GetArticlesType } from './dto/get-articles.type';
import { UpdateArticleDataType } from './dto/update-article-data.type';
import { FastifyRequest } from 'fastify';
import { FilesService } from 'src/files/files.service';
import { fileConstants } from 'src/files/constant';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService,
    private readonly filesService: FilesService,
  ) {}

  /**
   * The path to the article photo directory.
   */
  protected readonly articlesPhotoDir = `${fileConstants.PUBLIC_PATH}/articles`;

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
   * @param queries The queries to filter and sort articles.
   * @returns The articles.
   */
  async getArticles({ search, sortBy = 'date', categoryId }: GetArticlesType) {
    if (categoryId) {
      await this.verifyCategoryId(categoryId);
    }

    return await this.prisma.article.findMany({
      where: {
        title: { contains: search },
        categoryId: categoryId === '' ? null : categoryId,
      },
      orderBy: sortBy === 'title' ? { title: 'asc' } : { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        photo: true,
        createdAt: true,
        categoryId: true,
      },
    });
  }

  /**
   * Get an article by id.
   * @param id The article id.
   * @returns The article.
   * @throws {NotFoundException} If the article is not found.
   */
  async getArticle(id: string): Promise<Article & { category: Category }> {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: { category: true },
    });
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
    if (data.categoryId) {
      await this.verifyCategoryId(data.categoryId);
    }

    return await this.prisma.article.update({
      where: { id },
      data,
    });
  }

  /**
   * Upload an article photo.
   * @param id The article id.
   * @param req The request that contains the file.
   * @throws {NotFoundException} If the article is not found.
   * @throws {BadRequestException} If the request is invalid.
   */
  async uploadPhoto(id: string, req: FastifyRequest) {
    const { photo: oldPhotoPath } = await this.getArticle(id);

    const filePath = await this.filesService.uploadFile(req, {
      destination: this.articlesPhotoDir,
      rename: (oldName) => `${id}_${Date.now()}.${oldName.split('.').pop()}`,
      allowedMimetypes: fileConstants.IMAGE_MIMETYPES,
      maxFileSize: 2 * 1024 * 1024,
    });

    // Check for old photo
    if (oldPhotoPath) {
      await this.filesService.deleteFile(oldPhotoPath);
    }

    await this.updateArticle(id, { photo: filePath });
  }

  /**
   * Get an article photo.
   * @param id The article id.
   * @returns The article photo.
   * @throws {NotFoundException} If the article or the photo is not found.
   */
  async getPhoto(id: string) {
    const { photo } = await this.getArticle(id);
    return await this.filesService.getFile(photo);
  }

  /**
   * Delete an article photo.
   * @param id The article id.
   * @throws {NotFoundException} If the article or the photo is not found.
   */
  async deletePhoto(id: string): Promise<void> {
    const { photo } = await this.getArticle(id);
    await this.filesService.deleteFile(photo);
    await this.updateArticle(id, { photo: null });
  }

  /**
   * Delete an article.
   * @param id The article id.
   * @throws {NotFoundException} If the article is not found.
   */
  async deleteArticle(id: string): Promise<void> {
    await this.deletePhoto(id);
    await this.prisma.article.delete({ where: { id } });
  }
}
