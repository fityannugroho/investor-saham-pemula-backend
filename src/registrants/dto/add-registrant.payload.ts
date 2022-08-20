import { PickType } from '@nestjs/mapped-types';
import { RegistrantValidator } from './RegistrantValidator';

export class AddRegistrantPayload extends PickType(RegistrantValidator, [
  'name',
  'email',
] as const) {}
