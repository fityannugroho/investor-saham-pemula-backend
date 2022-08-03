import { PartialType } from '@nestjs/mapped-types';
import { CreateArticlePayload } from './create-article.payload';

export class UpdateArticlePayload extends PartialType(CreateArticlePayload) {}
