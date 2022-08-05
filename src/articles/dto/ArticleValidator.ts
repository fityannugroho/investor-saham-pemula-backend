import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
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
  content: string;

  @IsNotEmpty()
  @IsString()
  @IsNotSymbol()
  @MaxLength(255)
  writer: string;

  @IsOptional()
  @IsUrl()
  photo?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
