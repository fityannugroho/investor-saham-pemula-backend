import { IsNanoid } from 'src/common/decorator/IsNanoid';

export class AdminValidator {
  @IsNanoid(16)
  id: string;

  @IsNanoid(16)
  userId: string;
}
