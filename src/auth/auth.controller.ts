import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @Post()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return req.user;
  }
}
