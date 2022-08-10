import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTokenPayload {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
