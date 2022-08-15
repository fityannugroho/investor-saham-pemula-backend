import { PickType } from '@nestjs/mapped-types';
import { RegistrantValidator } from './RegistrantValidator';

export class GetRegistrantParam extends PickType(RegistrantValidator, [
  'id',
] as const) {}
