import { OmitType, PartialType } from '@nestjs/mapped-types';
import { AddBranchPayload } from './add-branch.payload';

export class UpdateBranchPayload extends PartialType(
  OmitType(AddBranchPayload, ['registrantId'] as const),
) {}
