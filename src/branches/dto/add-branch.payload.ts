import { PickType } from '@nestjs/mapped-types';
import { BranchValidator } from './BranchValidator';

export class AddBranchPayload extends PickType(BranchValidator, [
  'location',
  'email',
  'socialMedia',
  'registrantId',
] as const) {}
