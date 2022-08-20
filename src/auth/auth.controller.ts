import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Bearer } from 'src/common/decorator/bearer.decorator';
import { AuthService } from './auth.service';
import { LoginPayload } from './dto/login.payload';
import { LogoutPayload } from './dto/logout.payload';
import { UpdateTokenPayload } from './dto/update-token.payload';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() payload: LoginPayload) {
    const { email, password } = payload;
    const tokens = await this.authService.loginAdmin(email, password);
    return {
      statusCode: 201,
      message: 'Login successful',
      data: { ...tokens },
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Bearer() authPayload: any) {
    const profile = await this.authService.getAdminProfile(authPayload.id);
    return { ...profile, ...authPayload };
  }

  @Patch()
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

  @Delete()
  @UseGuards(JwtAuthGuard)
  async logout(@Body() payload: LogoutPayload) {
    await this.authService.logoutAdmin(payload.refreshToken);
    return {
      statusCode: 200,
      message: 'Logout successful',
    };
  }
}
