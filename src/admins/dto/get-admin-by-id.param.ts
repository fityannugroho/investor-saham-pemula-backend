import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GetAdminByIdParam {
  @IsNotEmpty()
  @IsString()
  @Length(16, 16)
  id: string;
}
