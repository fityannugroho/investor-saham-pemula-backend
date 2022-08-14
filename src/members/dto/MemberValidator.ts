import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EqualsAny } from 'src/common/decorator/EqualsAny';
import { IsNanoid } from 'src/common/decorator/IsNanoid';
import { IsNotSymbol } from 'src/common/decorator/IsNotSymbol';

export class MemberValidator {
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
  @MaxLength(320)
  email: string;

  @IsNotEmpty()
  @EqualsAny(['male', 'female'])
  gender: 'male' | 'female';

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  socialMedia: string;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @IsOptional()
  @IsNanoid(16)
  adminId: string;

  @IsOptional()
  @IsDateString()
  acceptedAt?: Date;
}
