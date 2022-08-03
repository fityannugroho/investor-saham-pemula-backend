import { Controller, Post, Body } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticlePayload } from './dto/create-article.payload';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async createArticle(@Body() payload: CreateArticlePayload) {
    const articleId = await this.articlesService.createArticle(payload);
    return {
      statusCode: 201,
      message: 'Article created successfully',
      data: { articleId },
    };
  }
}
