import { PickType } from '@nestjs/mapped-types';
import { BranchValidator } from './BranchValidator';

export class GetBranchParam extends PickType(BranchValidator, [
  'id',
] as const) {}
