import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsNanoid } from 'src/common/decorator/IsNanoid';
import { IsNotSymbol } from 'src/common/decorator/IsNotSymbol';

export class RegistrantValidator {
  @IsNotEmpty()
  @IsNanoid(16)
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsNotSymbol()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  idCard: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  cv?: string;
}
