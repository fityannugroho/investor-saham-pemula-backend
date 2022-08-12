import { ArticleValidator } from './ArticleValidator';
import { CreateArticlePayload } from './create-article.payload';

export type CreateArticleDataType = CreateArticlePayload &
  Pick<ArticleValidator, 'adminId' | 'photo'>;
