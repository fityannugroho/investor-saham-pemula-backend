import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    const accessToken = await this.authService.loginAdmin(req.user);
    return {
      statusCode: 201,
      message: 'Login successful',
      data: { accessToken },
    };
  }
}
