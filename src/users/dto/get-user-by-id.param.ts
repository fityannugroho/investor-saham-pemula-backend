import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetUserByIdParam {
  @IsNotEmpty()
  @IsString()
  @Length(16, 16)
  id: string;
}
