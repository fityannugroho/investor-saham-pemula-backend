import { Controller } from '@nestjs/common';
import { RegistrantsService } from './registrants.service';

@Controller('registrants')
export class RegistrantsController {
  constructor(private readonly registrantsService: RegistrantsService) {}
}
