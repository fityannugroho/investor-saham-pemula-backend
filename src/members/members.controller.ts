import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RegisterMemberPayload } from './dto/register-member.payload';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  async registerMember(@Body() payload: RegisterMemberPayload) {
    const memberId = await this.membersService.addMember(payload);
    return {
      statusCode: 201,
      message: 'Member registered successfully',
      data: { memberId },
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMembers() {
    return await this.membersService.getMembers();
  }
}
