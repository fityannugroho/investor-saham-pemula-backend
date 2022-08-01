import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddUserPayload {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(320)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
