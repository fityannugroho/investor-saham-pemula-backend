import { Body, Controller, Post } from '@nestjs/common';
import { AddRegistrantPayload } from './dto/add-registrant.payload';
import { RegistrantsService } from './registrants.service';

@Controller('registrants')
export class RegistrantsController {
  constructor(private readonly registrantsService: RegistrantsService) {}

  @Post()
  async addRegistrant(@Body() payload: AddRegistrantPayload) {
    const registrantId = await this.registrantsService.addRegistrant(payload);
    return {
      statusCode: 201,
      message: 'Registrant added successfully',
      data: { registrantId },
    };
  }
}
