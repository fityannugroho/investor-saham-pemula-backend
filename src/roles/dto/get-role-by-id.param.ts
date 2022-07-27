import { IsString, Length } from 'class-validator';

export class GetRoleByIdParam {
  @IsString()
  @Length(16, 16)
  id: string;
}
