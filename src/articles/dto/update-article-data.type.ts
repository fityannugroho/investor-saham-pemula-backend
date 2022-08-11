import { ArticleValidator } from './ArticleValidator';
import { UpdateArticlePayload } from './update-article.payload';

export type UpdateArticleDataType = Partial<UpdateArticlePayload> &
  Pick<ArticleValidator, 'adminId'>;
