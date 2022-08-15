import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatistics() {
    const categories = await this.prisma.category.findMany();
    const articles = await this.prisma.article.findMany({
      select: { id: true, categoryId: true },
    });

    return {
      article: {
        total: await this.prisma.article.count(),
        categories: {
          names: ['Article', ...categories.map((category) => category.name)],
          counts: [
            await this.prisma.article.count({ where: { categoryId: null } }),
            ...categories.map(
              (category) =>
                articles.filter((article) => article.categoryId === category.id)
                  .length,
            ),
          ],
        },
      },
      member: {
        total: await this.prisma.member.count(),
      },
      branch: {
        total: await this.prisma.branch.count(),
      },
    };
  }
}
