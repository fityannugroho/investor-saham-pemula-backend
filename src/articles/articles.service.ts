import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticlePayload } from './dto/create-article.payload';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create new article.
   * @param data The article data that contains: `authorId`, `title`, `content`.
   * @returns The article id.
   */
  async createArticle({
    title,
    content,
    writer,
    photo,
  }: CreateArticlePayload): Promise<string> {
    const id = nanoid(16);
    const result = await this.prisma.article.create({
      data: { id, title, content, writer, photo },
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
}
