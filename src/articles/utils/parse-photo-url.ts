import { Article } from '@prisma/client';

export const parsePhotoUrl = (article: Article) => ({
  ...article,
  photo: article.photo
    ? `${process.env.APP_URL}/articles/${article.id}/photo`
    : article.photo,
});
