import { IsNotEmpty, IsString } from 'class-validator';

export class GetIdCardQuery {
  @IsNotEmpty()
  @IsString()
  token: string;
}
