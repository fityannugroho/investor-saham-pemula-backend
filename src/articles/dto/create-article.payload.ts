import { PickType } from '@nestjs/mapped-types';
import { ArticleValidator } from './ArticleValidator';

export class CreateArticlePayload extends PickType(ArticleValidator, [
  'title',
  'content',
  'writer',
  'categoryId',
] as const) {}
