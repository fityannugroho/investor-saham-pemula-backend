import { PickType } from '@nestjs/mapped-types';
import { ArticleValidator } from './ArticleValidator';

export class CreateArticlePayload extends PickType(ArticleValidator, [
  'authorId',
  'title',
  'content',
] as const) {}
