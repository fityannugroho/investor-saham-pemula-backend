import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsNanoid } from 'src/common/decorator/IsNanoid';

export class BranchValidator {
  @IsNotEmpty()
  @IsNanoid(16)
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  location: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

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
  registrantId?: string;

  @IsOptional()
  @IsNanoid(16)
  adminId?: string;

  @IsOptional()
  @IsDateString()
  acceptedAt?: Date;
}
