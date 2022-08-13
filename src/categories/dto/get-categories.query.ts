import { IsOptional } from 'class-validator';
import { EqualsAny } from 'src/common/decorator/EqualsAny';

export class GetCategoriesQuery {
  @IsOptional()
  @EqualsAny(['id', 'name'])
  sortBy: 'id' | 'name';
}
