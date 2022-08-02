import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AdminValidator {
  @IsNotEmpty()
  @IsString()
  @Length(16, 16)
  id: string;

  @IsNotEmpty()
  @IsString()
  @Length(16, 16)
  userId: string;
}
