import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddRegistrantPayload } from './dto/add-registrant.payload';
import { GetRegistrantParam } from './dto/get-registrant.param';
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

  @Patch('/:id')
  async updateRegistrant(
    @Param() { id }: GetRegistrantParam,
    @Body() payload: AddRegistrantPayload,
  ) {
    const updatedRegistrant = await this.registrantsService.updateRegistrant(
      id,
      payload,
    );
    return {
      statusCode: 200,
      message: 'Registrant updated successfully',
      data: updatedRegistrant,
    };
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteRegistrant(@Param() { id }: GetRegistrantParam) {
    await this.registrantsService.deleteRegistrant(id);
    return {
      statusCode: 200,
      message: 'Registrant deleted successfully',
    };
  }
}
