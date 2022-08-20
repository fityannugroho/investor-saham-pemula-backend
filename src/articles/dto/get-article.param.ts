import { PickType } from '@nestjs/mapped-types';
import { ArticleValidator } from './ArticleValidator';

export class GetArticleParam extends PickType(ArticleValidator, [
  'id',
] as const) {}
