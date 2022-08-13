import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
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
    return await this.articlesService.getArticles(queries);
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
    @Bearer('id') adminId: string,
  ) {
    const updatedArticle = await this.articlesService.updateArticle(params.id, {
      ...payload,
      adminId,
    });

    return {
      statusCode: 200,
      message: 'Article updated successfully',
      data: { ...updatedArticle },
    };
  }

  @Post('/:id/photo')
  @UseGuards(JwtAuthGuard)
  async uploadPhoto(
    @Param() { id }: GetArticleParam,
    @Req() req: FastifyRequest,
  ) {
    await this.articlesService.uploadPhoto(id, req);
    return {
      statusCode: 201,
      message: 'Article photo uploaded successfully',
    };
  }

  @Get('/:id/photo')
  async getPhoto(@Param() { id }: GetArticleParam) {
    return await this.articlesService.getPhoto(id);
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
