import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsValidHtml } from 'src/common/decorator/is-valid-html.decorator';
import { IsNanoid } from 'src/common/decorator/IsNanoid';
import { IsNotSymbol } from 'src/common/decorator/IsNotSymbol';

export class ArticleValidator {
  @IsNotEmpty()
  @IsNanoid(16)
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsValidHtml()
  content: string;

  @IsNotEmpty()
  @IsString()
  @IsNotSymbol()
  @MaxLength(255)
  writer: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  photo?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @IsOptional()
  @IsNanoid(16)
  adminId?: string;

  @IsOptional()
  @IsNanoid(16)
  categoryId?: string;
}
