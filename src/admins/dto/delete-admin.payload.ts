import { IsNotEmpty, IsString, Length } from 'class-validator';

export class DeleteAdminPayload {
  @IsNotEmpty()
  @IsString()
  @Length(16, 16)
  id: string;
}
