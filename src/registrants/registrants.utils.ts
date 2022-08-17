import { Registrant } from '@prisma/client';

export const parseIdCardUrl = (registrant: Registrant) => ({
  ...registrant,
  idCard: registrant.idCard
    ? `${process.env.APP_URL}/registrants/${registrant.id}/idcard`
    : null,
});
