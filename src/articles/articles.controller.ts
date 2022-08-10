import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Bearer } from 'src/common/decorator/bearer.decorator';
import { ArticlesService } from './articles.service';
import { CreateArticlePayload } from './dto/create-article.payload';
import { GetArticleParam } from './dto/get-article.param';
import { GetArticlesQuery } from './dto/get-articles.query';
import { UpdateArticlePayload } from './dto/update-article.payload';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createArticle(
    @Body() payload: CreateArticlePayload,
    @Bearer('id') adminId: string,
  ) {
    const articleId = await this.articlesService.createArticle({
      ...payload,
      adminId,
    });

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

  @Get('/:id')
  async getArticle(@Param() params: GetArticleParam) {
    return await this.articlesService.getArticle(params.id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateArticle(
    @Param() params: GetArticleParam,
    @Body() payload: UpdateArticlePayload,
  ) {
    const updatedArticle = await this.articlesService.updateArticle(
      params.id,
      payload,
    );
    return {
      statusCode: 200,
      message: 'Article updated successfully',
      data: { ...updatedArticle },
    };
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteArticle(@Param() params: GetArticleParam) {
    await this.articlesService.deleteArticle(params.id);
    return {
      statusCode: 200,
      message: 'Article deleted successfully',
    };
  }
}
