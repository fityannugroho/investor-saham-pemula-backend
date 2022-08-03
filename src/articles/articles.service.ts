import { ForbiddenException, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { AdminsService } from 'src/admins/admins.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticlePayload } from './dto/create-article.payload';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adminsService: AdminsService,
  ) {}

  /**
   * Verify that the author is an admin.
   * @param authorId The author id.
   */
  async verifyAuthorIsAdmin(authorId: string): Promise<void> {
    try {
      await this.adminsService.getAdminById(authorId);
    } catch {
      throw new ForbiddenException('Author must be an admin');
    }
  }

  /**
   * Create new article.
   * @param data The article data that contains: `authorId`, `title`, `content`.
   * @returns The article id.
   */
  async createArticle({
    authorId,
    title,
    content,
  }: CreateArticlePayload): Promise<string> {
    await this.verifyAuthorIsAdmin(authorId);

    const id = nanoid(16);
    const result = await this.prisma.article.create({
      data: { id, authorId, title, content },
      select: { id: true },
    });

    return result.id;
  }
}
