import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class AddUserPayload {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsEmail()
  @MaxLength(320)
  email: string;

  @IsString()
  password: string;

  @IsString()
  @Length(16, 16)
  roleId: string;
}
