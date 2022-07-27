import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { EqualsAny } from 'src/common/decorator/EqualsAny';

export class GetAllRolesQuery {
  @IsOptional()
  @EqualsAny(Object.keys(Prisma.RoleScalarFieldEnum))
  sortBy?: Prisma.RoleScalarFieldEnum;

  @IsOptional()
  @EqualsAny(Object.keys(Prisma.SortOrder))
  sortOrder?: Prisma.SortOrder;
}
