import { PickType } from '@nestjs/mapped-types';
import { UpdateTokenPayload } from './update-token.payload';

export class LogoutPayload extends PickType(UpdateTokenPayload, [
  'refreshToken',
] as const) {}
