import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsNanoid } from 'src/common/decorator/IsNanoid';

export class UserValidator {
  @IsNanoid(16)
  id: string;

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
