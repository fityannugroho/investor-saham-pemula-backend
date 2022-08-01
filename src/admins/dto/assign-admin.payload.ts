import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AssignAdminRolePayload {
  @IsNotEmpty()
  @IsString()
  @Length(16, 16)
  userId: string;
}
