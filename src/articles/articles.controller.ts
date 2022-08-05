import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticlePayload } from './dto/create-article.payload';
import { GetArticlesQuery } from './dto/get-articles.query';

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

  @Get()
  async getArticles(@Query() queries: GetArticlesQuery) {
    const { search, sortBy } = queries;
    return await this.articlesService.getArticles(search, sortBy);
  }
}
