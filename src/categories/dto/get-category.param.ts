import { IsNotEmpty } from 'class-validator';
import { IsNanoid } from 'src/common/decorator/IsNanoid';

export class GetCategoryParam {
  @IsNotEmpty()
  @IsNanoid(16)
  id: string;
}
