import { PickType } from '@nestjs/mapped-types';
import { ArticleValidator } from './ArticleValidator';

export class UploadPhotoParam extends PickType(ArticleValidator, [
  'id',
] as const) {}
