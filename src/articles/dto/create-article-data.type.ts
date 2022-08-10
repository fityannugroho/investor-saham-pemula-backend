import { ArticleValidator } from './ArticleValidator';

export type CreateArticleDataType = Pick<
  ArticleValidator,
  'title' | 'content' | 'writer' | 'photo' | 'adminId'
>;
