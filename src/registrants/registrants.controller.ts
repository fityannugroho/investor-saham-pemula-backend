import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { jwtConstants } from 'src/token/constant';
import { TokenService } from 'src/token/token.service';
import { AddRegistrantPayload } from './dto/add-registrant.payload';
import { GetIdCardQuery } from './dto/get-id-card.query';
import { GetRegistrantParam } from './dto/get-registrant.param';
import { RegistrantsService } from './registrants.service';

@Controller('registrants')
export class RegistrantsController {
  constructor(
    private readonly registrantsService: RegistrantsService,
    private readonly tokenService: TokenService,
  ) {}

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

  @Post('/:id/idcard')
  async uploadIdCard(
    @Param() { id }: GetRegistrantParam,
    @Req() req: FastifyRequest,
  ) {
    await this.registrantsService.uploadIdCard(id, req);
    return {
      statusCode: 201,
      message: 'Id card uploaded successfully',
    };
  }

  @Get('/:id/idcard')
  async getIdCard(
    @Param() { id }: GetRegistrantParam,
    @Query() { token }: GetIdCardQuery,
  ) {
    try {
      await this.tokenService.verifyJwtToken(token, {
        secret: jwtConstants.accessTokenKey,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
    return await this.registrantsService.getIdCard(id);
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
