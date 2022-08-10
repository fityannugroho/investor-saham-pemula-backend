import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateTokenPayload } from './dto/update-token.payload';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    const tokens = await this.authService.loginAdmin(req.user);
    return {
      statusCode: 201,
      message: 'Login successful',
      data: { ...tokens },
    };
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateToken(@Body() payload: UpdateTokenPayload) {
    const accessToken = await this.authService.updateAccessToken(
      payload.refreshToken,
    );
    return {
      statusCode: 200,
      message: 'Access token updated successfully',
      data: { accessToken },
    };
  }
}
