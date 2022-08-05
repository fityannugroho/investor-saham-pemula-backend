import { IsOptional, IsString, MaxLength } from 'class-validator';
import { EqualsAny } from 'src/common/decorator/EqualsAny';

export class GetArticlesQuery {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  search?: string;

  @IsOptional()
  @EqualsAny(['date', 'title'])
  sortBy?: 'date' | 'title';
}
